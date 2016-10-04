var Keyboard = function() {
	var keyCodes = {
		37: "left", // arrow keys
		38: "up", // ^
		39: "right", // ^
		40: "down", // ^
		65: "left", // A
		83: "down", // S
		68: "right", // D
		87: "up" // W
	};

	var keys = {
		"left": false,
		"right": false,
		"up": false,
		"down": false
	};

	var setKey = function(c, pressed) {
		if (keyCodes.hasOwnProperty(c)) {
			keys[keyCodes[c]] = pressed;
		} else {
			//console.log(c);
		}
	};
	
	var onKeyDown = function(e) {
		setKey(e.keyCode, true);
	};

	var onKeyUp = function(e) {
		setKey(e.keyCode, false);
	};

	return {
		keys: keys,
		onKeyDown: onKeyDown,
		onKeyUp: onKeyUp
	};
}