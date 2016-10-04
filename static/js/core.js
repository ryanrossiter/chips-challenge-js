window.onload = function() {
	var canvas = document.getElementById("main-canvas");
	Registry.loadResources();

	Core.init(canvas);
	Core.setDebug(true);

	var interval = setInterval(function() {
		if (Registry.LOADED) {
			Core.start();
			clearInterval(interval);
		}
	}, 200);
}

var Core = {
	DEBUG: false,
	MAX_FRAMERATE: 60,

	PLAY_STATE: 0,
	MENU_STATE: 1,

	gameState: undefined,
	keyboard: undefined,
	mouse: undefined,

	map: [[]],
	mapWidth: 0,
	mapHeight: 0,
	screenTileWidth: 0,
	screenTileHeight: 0,

	alive: true,
	chipsRemaining: 0,
	playerX: 1,
	playerY: 1,

	playerXOff: 0,
	playerYOff: 0,

	LEFT: 0,
	RIGHT: 1,
	UP: 2,
	DOWN: 3,
	dir: 3,

	hasFlippers: false,
	hasFireBoots: false,
	hasStickyBoots: false,
	hasSkates: false,

	hasKeyA: false,
	hasKeyB: false,
	hasKeyC: false,
	hasKeyD: false,

	monsters: [],

	init: function(canvas) {
		this.canvas = canvas;
		this.screenTileWidth = Math.ceil(canvas.width / TILE_SIZE);
		this.screenTileHeight = Math.ceil(canvas.height / TILE_SIZE);

		this.screen = new Screen(canvas);
		this.screen.backgroundColor = "#FF1493";

		var scope = this;
		MainLoop.setMaxAllowedFPS(this.MAX_FRAMERATE);
		MainLoop.setUpdate(function() { scope.update(); });
		MainLoop.setDraw(function() { scope.draw(); });

		this.keyboard = new Keyboard();
		this.mouse = new Mouse();

		this._setEventHandlers();
	},

	_setEventHandlers: function() {
		var scope = this;

		window.addEventListener("keydown", this.keyboard.onKeyDown);
		window.addEventListener("keyup", this.keyboard.onKeyUp);

		this.canvas.addEventListener('mousemove', function(evt) {
			var rect = scope.canvas.getBoundingClientRect();
			scope.mouse.mouseMove(evt, rect);
		}, false);

		this.canvas.addEventListener('click', function(evt) {
			var rect = scope.canvas.getBoundingClientRect();
			scope.mouse.onClick(evt, rect);
		}, false);
	},

	setDebug: function(debug) {
		this.DEBUG = debug;
	},

	start: function() {
		this.gameState = this.PLAY_STATE;
		this.map = Registry.getMap('test');
		this.mapWidth = this.map[0].length;
		this.mapHeight = this.map.length;
		this.chipsRemaining = 0;

		var scope = this;
		this.findTile(TILES.CHIP, function() {
			scope.chipsRemaining++;
		});

		this.findTile('*', function(x, y) {
			scope.playerX = x;
			scope.playerY = y;
			scope.setTile(x, y, TILES.FLOOR);
		});

		this.findTile('M', function(x, y) {
			scope.monsters.push({
				x: x,
				y: y,
				xOff: 0,
				yOff: 0,
				dir: scope.DOWN
			});
			scope.setTile(x, y, TILES.FLOOR);
		});

		MainLoop.start();
		console.log("Started game.");
	},

	findTile: function(tileId, callback) {
		for (var y = 0; y < this.mapHeight; y++) {
			for ( var x = 0; x < this.mapWidth; x++ ) {
				if (this.map[y][x] == tileId) callback(x, y);
			}
		}
	},

	intersects: function(x0, y0, w0, h0, x1, y1, w1, h1) {
		return !(x0 > x1 + w1 || x0 + w0 < x1 || y0 > y1 + h1 || y0 + h0 < y1);
	},

	canMove: function(x, y) {
		var tile = this.getTile(x, y);

		if (LOCK_TILES.indexOf(tile) !== -1) {
			if ((tile == TILES.LOCK_A && this.hasKeyA)
				|| (tile == TILES.LOCK_B && this.hasKeyB)
				|| (tile == TILES.LOCK_C && this.hasKeyC)
				|| (tile == TILES.LOCK_D && this.hasKeyD)) {

				this.setTile(x, y, TILES.FLOOR);
			} else return false;
		}

		return SOLID_TILES.indexOf(tile) === -1;
	},

	move: function(x, y) {
		this.playerX = x;
		this.playerY = y;

		var tile = this.getTile(x, y);
		if (tile == TILES.CHIP) {
			this.chipsRemaining--;
			if (this.chipsRemaining == 0) {
				var scope = this;
				this.findTile(TILES.CHIP_GATE, function(x, y) {
					scope.setTile(x, y, TILES.FLOOR);
				});
			}
			this.setTile(x, y, TILES.FLOOR);
		} else if (tile == TILES.WATER && !this.hasFlippers) {
			this.alive = false;
			// DROWN
		} else if (tile == TILES.FIRE && !this.hasFireBoots) {
			this.alive = false;
			// BURN
		} else if (tile == TILES.FLIPPERS) {
			this.hasFlippers = true;
			this.setTile(x, y, TILES.FLOOR);
		} else if (tile == TILES.FIRE_BOOTS) {
			this.hasFireBoots = true;
			this.setTile(x, y, TILES.FLOOR);
		} else if (tile == TILES.SKATES) {
			this.hasSkates = true;
			this.setTile(x, y, TILES.FLOOR);
		} else if (tile == TILES.STICKY_BOOTS) {
			this.hasStickyBoots = true;
			this.setTile(x, y, TILES.FLOOR);
		} else if (tile == TILES.KEY_A) {
			this.hasKeyA = true;
			this.setTile(x, y, TILES.FLOOR);
		} else if (tile == TILES.KEY_B) {
			this.hasKeyB = true;
			this.setTile(x, y, TILES.FLOOR);
		} else if (tile == TILES.KEY_C) {
			this.hasKeyC = true;
			this.setTile(x, y, TILES.FLOOR);
		} else if (tile == TILES.KEY_D) {
			this.hasKeyD = true;
			this.setTile(x, y, TILES.FLOOR);
		}
	},

	moveMonster: function(monster) {
		var goal = [this.playerX, this.playerY];

		var paths = [[monster.x, monster.y]];
		var usedPoints = [[monster.x, monster.y]];

		while (true) {
			var newPaths = [];

			for (var i = 0; i < paths.length; i++) {
				result = this._calcPath(paths[i], usedPoints, goal);
				newPaths.concat(result.paths);

				for (var i = 0; i < result.paths.length; i++) {
					usedPoints = this._addPointsToArray(usedPoints, result.paths[i]);
				}
			}

			paths = newPaths;
		}
	},

	/********
	*
	* TODO: Finish pathfinding.
	*
	********/
	// Path: [[x,y], [x,y], ..., [x,y]] of starting point to current point
	// usedPoints: array of points that have been used by the algorithm, the sum of all paths
	// goal: the ending point
	_calcPath: function(path, usedPoints, goal) {
		if (path.length === 0) return;
		var newPaths = [];

		var p = path[path.length - 1]; // The current point;
		if (MONSTER_TILES.indexOf(this.getTile(p[0] - 1, p[1])) !== -1) {
			var newPath = this._copyArray(path);
			newPath.push([p[0] - 1, p[1]]);
			newPaths.push(newPath);
		}

		if (MONSTER_TILES.indexOf(this.getTile(p[0] + 1, p[1])) !== -1) {
			var newPath = this._copyArray(path);
			newPath.push([p[0] + 1, p[1]]);
			newPaths.push(newPath);
		}

		if (MONSTER_TILES.indexOf(this.getTile(p[0], p[1] - 1)) !== -1) {
			var newPath = this._copyArray(path);
			newPath.push([p[0], p[1] - 1]);
			newPaths.push(newPath);
		}

		if (MONSTER_TILES.indexOf(this.getTile(p[0], p[1] + 1)) !== -1) {
			var newPath = this._copyArray(path);
			newPath.push([p[0], p[1] + 1]);
			newPaths.push(newPath);
		}

		return
	},

	_copyArray: function(array) {
		var newArr = [];
		for (var i = 0; i < array.length; i++) {
			newArr[i] = array[i];
		}
		return newArr;
	},

	_addPointsToArray: function(array, points) {
		for (var ii = 0; ii < points.length; ii++) {
			array.push(points[ii]);
		}

		return array;
	},

	update: function() {

		if (this.playerXOff > 0) this.playerXOff -= 2;
		else if (this.playerXOff < 0) this.playerXOff += 2;

		if (this.playerYOff > 0) this.playerYOff -= 2;
		else if (this.playerYOff < 0) this.playerYOff += 2;

		if (this.playerXOff == 0 && this.playerYOff == 0 && this.alive) {
			var tile = this.getTile(this.playerX, this.playerY);
			var moved = (ICE_TILES.indexOf(tile) !== -1 && !this.hasSkates) || (BOOST_TILES.indexOf(tile) !== -1 && !this.hasStickyBoots);
			if (!moved) {
				if (this.keyboard.keys["left"]) {
					this.dir = this.LEFT;
					moved = true;
				} else if (this.keyboard.keys["right"]) {
					this.dir = this.RIGHT;
					moved = true;
				} else if (this.keyboard.keys["up"]) {
					this.dir = this.UP;
					moved = true;
				} else if (this.keyboard.keys["down"]) {
					this.dir = this.DOWN;
					moved = true;
				}
			} else {
				switch (tile) {
					case TILES.ICE_BUMPER_TOP_LEFT:
						if (this.dir == this.LEFT) this.dir = this.DOWN;
						else if (this.dir == this.UP) this.dir = this.RIGHT;
						break;
					case TILES.ICE_BUMPER_TOP_RIGHT:
						if (this.dir == this.RIGHT) this.dir = this.DOWN;
						else if (this.dir == this.UP) this.dir = this.LEFT;
						break;
					case TILES.ICE_BUMPER_BOTTOM_LEFT:
						if (this.dir == this.LEFT) this.dir = this.UP;
						else if (this.dir == this.DOWN) this.dir = this.RIGHT;
						break;
					case TILES.ICE_BUMPER_BOTTOM_RIGHT:
						if (this.dir == this.RIGHT) this.dir = this.UP;
						else if (this.dir == this.DOWN) this.dir = this.LEFT;
						break;
					case TILES.BOOST_UP:
						this.dir = this.UP;
						break;
					case TILES.BOOST_DOWN:
						this.dir = this.DOWN;
						break;
					case TILES.BOOST_LEFT:
						this.dir = this.LEFT;
						break;
					case TILES.BOOST_RIGHT:
						this.dir = this.RIGHT;
						break;
				}
			}

			if (moved) {
				switch (this.dir) {
					case this.LEFT:
						if (this.canMove(this.playerX - 1, this.playerY)) {
							this.move(this.playerX - 1, this.playerY);
							this.playerXOff = TILE_SIZE;
						} else this.sliding = false;
						break;

					case this.RIGHT:
						if (this.canMove(this.playerX + 1, this.playerY)) {
							this.move(this.playerX + 1, this.playerY);
							this.playerXOff = -TILE_SIZE;
						} else this.sliding = false;
						break;

					case this.UP:
						if (this.canMove(this.playerX, this.playerY - 1)) {
							this.move(this.playerX, this.playerY - 1);
							this.playerYOff = TILE_SIZE;
						} else this.sliding = false;
						break;

					case this.DOWN:
						if (this.canMove(this.playerX, this.playerY + 1)) {
							this.move(this.playerX, this.playerY + 1);
							this.playerYOff = -TILE_SIZE;
						} else this.sliding = false;
						break;
				}

				for (var i = 0; i < this.monsters.length; i++) {
					this.moveMonster(this.monsters[i]);
				}
			}
		}
	},

	draw: function() {
		var startX = this.playerX - ~~(this.screenTileWidth / 2);
		var startY = this.playerY - ~~(this.screenTileHeight / 2);
		for (var y = startY; y < startY + this.screenTileHeight; y++) {
			for (var x = startX; x < startX + this.screenTileWidth; x++) {
				var tile = this.getTile(x, y);
				if (TILE_ALIASES.hasOwnProperty(tile)) {
					var spriteName = TILE_ALIASES[tile];
					this.screen.drawSprite(spriteName, (x - startX)* TILE_SIZE, (y - startY)* TILE_SIZE, TILE_SIZE, TILE_SIZE);
				} else console.error("Undefined tile ID: '" + tile + "'");
			}
		}

		var tile = this.getTile(this.playerX, this.playerY);
		if (tile == TILES.WATER) {
			if (!this.alive && this.playerXOff == 0 && this.playerYOff == 0) {
				this.screen.drawSprite('SPLASH', ~~(this.screenTileWidth / 2) * TILE_SIZE, ~~(this.screenTileHeight / 2) * TILE_SIZE, TILE_SIZE, TILE_SIZE);
			} else {
				this.screen.drawFromSpritesheet("PLAYER_SWIMMING", 32, 32, this.dir, ~~(this.screenTileWidth / 2) * TILE_SIZE + this.playerXOff, ~~(this.screenTileHeight / 2) * TILE_SIZE + this.playerYOff);
			}
		} else if (tile == TILES.FIRE && !this.alive && this.playerXOff == 0 && this.playerYOff == 0) {
			this.screen.drawSprite('BURNT', ~~(this.screenTileWidth / 2) * TILE_SIZE, ~~(this.screenTileHeight / 2) * TILE_SIZE, TILE_SIZE, TILE_SIZE);
		} else {
			this.screen.drawFromSpritesheet("PLAYER", 32, 32, this.dir, ~~(this.screenTileWidth / 2) * TILE_SIZE + this.playerXOff, ~~(this.screenTileHeight / 2) * TILE_SIZE + this.playerYOff);
		}

		for (var i = 0; i < this.monsters.length; i++) {
			var m = this.monsters[i];
			this.screen.drawFromSpritesheet("MONSTER", 32, 32, m.dir, (m.x - startX) * TILE_SIZE + m.xOff, (m.y - startY) * TILE_SIZE + m.yOff);
		}

		if (this.DEBUG) {
			this.screen.drawText("fps: " + MainLoop.getFPS().toString().substring(0, 4), 10, 10, "#FFFFFF");
		}

		this.screen.drawText("CHIPS: " + this.chipsRemaining, 10, 20, "#FFFFFF");

		this.screen.show();
	},

	getTile: function(x, y) {
		if (x < 0 || x >= this.mapWidth || y < 0 || y >= this.mapHeight) return TILES.FLOOR;

		return this.map[y][x];
	},

	setTile: function(x, y, id) {
		if (x < 0 || x >= this.mapWidth || y < 0 || y >= this.mapHeight) return;

		this.map[y][x] = id;
	}
};