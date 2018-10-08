import Defs from '~/Defs';

export default class Keyboard {
	constructor() {
		this.keys = {
			"left": false,
			"right": false,
			"up": false,
			"down": false,
		};

		window.addEventListener("keydown", (evt) => this.onKeyDown(evt));
		window.addEventListener("keyup", (evt) => this.onKeyUp(evt));
	}

	isKeyDown(c) {
		return this.keys[c];
	}

	setKey(c, pressed) {
		if (Defs.KEY_CODES.hasOwnProperty(c)) {
			this.keys[Defs.KEY_CODES[c]] = pressed;
		} else {
			//console.log(c);
		}
	}
	
	onKeyDown(e) {
		this.setKey(e.keyCode, true);
	}

	onKeyUp(e) {
		this.setKey(e.keyCode, false);
	}
}
