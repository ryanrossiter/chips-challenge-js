export default class Mouse {
	constructor(canvas) {
		this.pos = {x: 0, y: 0};
		this.clicked = false;
		this.clickPos = {x: 0, y: 0};

		canvas.addEventListener('mousemove', (evt) => {
			var rect = canvas.getBoundingClientRect();
			this.mouseMove(evt, rect);
		}, false);

		canvas.addEventListener('click', (evt) => {
			var rect = canvas.getBoundingClientRect();
			this.onClick(evt, rect);
		}, false);
	}

	onClick(evt, rect) {
		this.clicked = true;
		this.clickPos.x = evt.clientX - rect.left;
		this.clickPos.y = evt.clientY - rect.top;
	}

	clickHandled() {
		clicked = false;
	}

	mouseMove(evt, rect) {
		this.pos.x = evt.clientX - rect.left;
		this.pos.y = evt.clientY - rect.top;
	}
}
