class Registry {
	constructor() {
		this.loaded = false;
		this.images = {};
		this.maps = {};	
	}

	loadResources() {
		if (this.loaded === true) {
			console.log("Resources are already loaded.")
			return;
		}

		var resources = document.getElementById("resources").children;
		for (var i = 0; i < resources.length; i++) {
			this._registerResource(resources[i]);
		}

		var interval = setInterval(() => {
			if (this._isLoaded()) {
				this.loaded = true;
				console.log("Finished loading resources.");
				clearInterval(interval);
			}
		}, 200);
	}

	_isLoaded() {
		for (let map in this.maps) {
			if (this.maps[map] === false) return false;
		}

		return true;
	}

	_registerResource(element) {
		var idSplit = element.id.split(":");
		var type = idSplit[0];
		var name = idSplit[1];

		if (type == "image") {
			this.images[name] = element;
			console.log("Registered image: " + name);
		} else if (type == "map") {
			this.maps[name] = false;
			var client = new XMLHttpRequest();
			client.open('GET',element.href);
			client.onreadystatechange = (state) => {
				if (client.readyState == 4) {
					var map = client.responseText.split('\n');
					for (var y = 0; y < map.length; y++) {
						var row = map[y].replace(/ /g, '_').trim();
						map[y] = [];
						for (var x = 0; x < row.length; x++) {
							map[y][x] = row[x];
						}
					}

					this.maps[name] = map;
					console.log("Registered map: " + name);
				}
			}
			client.send();
		}
	}

	getImage(name) {
		if (this.images.hasOwnProperty(name)) {
			return this.images[name];
		} else {
			console.warn("No image with name: " + name);
			return null;
		}
	}

	getMap(name) {
		if (this.maps.hasOwnProperty(name)) {
			return this.maps[name];
		} else {
			console.warn("No map with name: " + name);
			return [[0]];
		}
	}
};

export default new Registry();
