import Registry from '~/Registry';

export default class Screen {
	constructor(canvas) {
		this.buffer = document.createElement("canvas");
		this.canvas = canvas;
		this.buffer.width = this.canvas.width;
		this.buffer.height = this.canvas.height;

		this.bufferContext = this.buffer.getContext("2d");
		this.context = this.canvas.getContext("2d");

		this.bufferContext.font = "8px 'Lucida Sans Typewriter'";

		this.width = this.canvas.width;
		this.height = this.canvas.height;

		this.backgroundColor = "#FFFFFF";

		this.xOff = 0;
		this.yOff = 0;
	}

	show() {
		this.context.drawImage(this.buffer, 0, 0);
		this.drawRect(this.backgroundColor, 0, 0, this.width, this.height);
	}

	drawRect(color, x, y, w, h) {
		this.bufferContext.fillStyle = color;
		this.bufferContext.fillRect(x + this.xOff, y + this.yOff, w, h);
	}

	drawText(text, x, y, color) {
		if (color != undefined) {
			this.bufferContext.fillStyle = color;
		}
		this.bufferContext.fillText(text, x, y);
	}

	drawSprite(spriteName, x, y, w, h) {
		var img = Registry.getImage(spriteName);
		if (img == null) {
			console.error("Couldn't find sprite: " + spriteName);
			return;
		}

		if (w === undefined || h === undefined) {
			this.bufferContext.drawImage(img, x + this.xOff, y + this.yOff);
		} else {
			this.bufferContext.drawImage(img, 0, 0, img.width, img.height, x + this.xOff, y + this.yOff, w, h);
		}
	}

	drawFromSpritesheet(sheet, spriteW, spriteH, index, x, y) {
		var img = Registry.getImage(sheet);
		this.bufferContext.drawImage(img, spriteW * index, 0, spriteW, spriteH, x + this.xOff, y + this.yOff, spriteW, spriteH);
	}

	drawTile(tileset, tileID, tileX, tileY) {
		var img = Registry.getImage(tileset);
		var left = tileID == Core.getTileID(tileX - 1, tileY);
		var right = tileID == Core.getTileID(tileX + 1, tileY);
		var up = tileID == Core.getTileID(tileX, tileY - 1);
		var down = tileID == Core.getTileID(tileX, tileY + 1);

		var left_up = tileID == Core.getTileID(tileX - 1, tileY);
		var left_down = tileID == Core.getTileID(tileX - 1, tileY);
		var right_up = tileID == Core.getTileID(tileX - 1, tileY);
		var right_down = tileID == Core.getTileID(tileX - 1, tileY);
	}

	setOffset(xOffset, yOffset) {
		this.xOff = xOffset;
		this.yOff = yOffset;
	}
}
