import Registry from '~/Registry';
import Defs from '~/Defs';
import Keyboard from '~/Keyboard';
import Mouse from '~/Mouse';
import Screen from '~/Screen';
import Tiles from '~/Tiles';
import MainLoop from '~/mainloop';

class Core {
	constructor() {
		this.gameState = undefined;
		this.keyboard = undefined;
		this.mouse = undefined;

		this.map = [[]];
		this.mapWidth = 0;
		this.mapHeight = 0;
		this.screenTileWidth = 0;
		this.screenTileHeight = 0;

		this.alive = true;
		this.chipsRemaining = 0;
		this.playerX = 1;
		this.playerY = 1;

		this.playerXOff = 0;
		this.playerYOff = 0;
		this.dir = Defs.DIRS.DOWN;

		this.hasFlippers = false;
		this.hasFireBoots = false;
		this.hasStickyBoots = false;
		this.hasSkates = false;

		this.hasKeyA = false;
		this.hasKeyB = false;
		this.hasKeyC = false;
		this.hasKeyD = false;

		this.monsters = [];
	}

	init(canvas) {
		this.canvas = canvas;
		this.screenTileWidth = Math.ceil(canvas.width / Defs.TILE_SIZE);
		this.screenTileHeight = Math.ceil(canvas.height / Defs.TILE_SIZE);

		this.screen = new Screen(canvas);
		this.screen.backgroundColor = "#FF1493";

		MainLoop.setMaxAllowedFPS(Defs.FRAMERATE);
		MainLoop.setUpdate(() => this.update());
		MainLoop.setDraw(() => this.draw());

		this.keyboard = new Keyboard();
		this.mouse = new Mouse(canvas);

	}

	start() {
		this.gameState = Defs.PLAY_STATE;
		this.map = Registry.getMap('test');
		this.mapWidth = this.map[0].length;
		this.mapHeight = this.map.length;
		this.chipsRemaining = 0;

		this.findTile(Tiles.TILES.CHIP, () => {
			this.chipsRemaining++;
		});

		this.findTile('*', (x, y) => {
			this.playerX = x;
			this.playerY = y;
			this.setTile(x, y, Tiles.TILES.FLOOR);
		});

		this.findTile('M', (x, y) => {
			this.monsters.push({
				x: x,
				y: y,
				xOff: 0,
				yOff: 0,
				dir: Defs.DOWN
			});
			this.setTile(x, y, Tiles.TILES.FLOOR);
		});

		MainLoop.start();
		console.log("Started game.");
	}

	findTile(tileId, callback) {
		for (var y = 0; y < this.mapHeight; y++) {
			for ( var x = 0; x < this.mapWidth; x++ ) {
				if (this.map[y][x] == tileId) callback(x, y);
			}
		}
	}

	intersects(x0, y0, w0, h0, x1, y1, w1, h1) {
		return !(x0 > x1 + w1 || x0 + w0 < x1 || y0 > y1 + h1 || y0 + h0 < y1);
	}

	canMove(x, y) {
		var tile = this.getTile(x, y);

		if (Tiles.LOCK_TILES.indexOf(tile) !== -1) {
			if ((tile == Tiles.TILES.LOCK_A && this.hasKeyA)
				|| (tile == Tiles.TILES.LOCK_B && this.hasKeyB)
				|| (tile == Tiles.TILES.LOCK_C && this.hasKeyC)
				|| (tile == Tiles.TILES.LOCK_D && this.hasKeyD)) {

				this.setTile(x, y, Tiles.TILES.FLOOR);
			} else return false;
		}

		return Tiles.SOLID_TILES.indexOf(tile) === -1;
	}

	move(x, y) {
		this.playerX = x;
		this.playerY = y;

		var tile = this.getTile(x, y);
		if (tile == Tiles.TILES.CHIP) {
			this.chipsRemaining--;
			if (this.chipsRemaining == 0) {
				var scope = this;
				this.findTile(Tiles.TILES.CHIP_GATE, function(x, y) {
					scope.setTile(x, y, Tiles.TILES.FLOOR);
				});
			}
			this.setTile(x, y, Tiles.TILES.FLOOR);
		} else if (tile == Tiles.TILES.WATER && !this.hasFlippers) {
			this.alive = false;
			// DROWN
		} else if (tile == Tiles.TILES.FIRE && !this.hasFireBoots) {
			this.alive = false;
			// BURN
		} else if (tile == Tiles.TILES.FLIPPERS) {
			this.hasFlippers = true;
			this.setTile(x, y, Tiles.TILES.FLOOR);
		} else if (tile == Tiles.TILES.FIRE_BOOTS) {
			this.hasFireBoots = true;
			this.setTile(x, y, Tiles.TILES.FLOOR);
		} else if (tile == Tiles.TILES.SKATES) {
			this.hasSkates = true;
			this.setTile(x, y, Tiles.TILES.FLOOR);
		} else if (tile == Tiles.TILES.STICKY_BOOTS) {
			this.hasStickyBoots = true;
			this.setTile(x, y, Tiles.TILES.FLOOR);
		} else if (tile == Tiles.TILES.KEY_A) {
			this.hasKeyA = true;
			this.setTile(x, y, Tiles.TILES.FLOOR);
		} else if (tile == Tiles.TILES.KEY_B) {
			this.hasKeyB = true;
			this.setTile(x, y, Tiles.TILES.FLOOR);
		} else if (tile == Tiles.TILES.KEY_C) {
			this.hasKeyC = true;
			this.setTile(x, y, Tiles.TILES.FLOOR);
		} else if (tile == Tiles.TILES.KEY_D) {
			this.hasKeyD = true;
			this.setTile(x, y, Tiles.TILES.FLOOR);
		}
	}

	moveMonster(monster) {
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
	}

	/********
	*
	* TODO: Finish pathfinding.
	*
	********/
	// Path: [[x,y], [x,y], ..., [x,y]] of starting point to current point
	// usedPoints: array of points that have been used by the algorithm, the sum of all paths
	// goal: the ending point
	_calcPath(path, usedPoints, goal) {
		if (path.length === 0) return;
		var newPaths = [];

		var p = path[path.length - 1]; // The current point;
		if (Tiles.MONSTER_TILES.indexOf(this.getTile(p[0] - 1, p[1])) !== -1) {
			var newPath = this._copyArray(path);
			newPath.push([p[0] - 1, p[1]]);
			newPaths.push(newPath);
		}

		if (Tiles.MONSTER_TILES.indexOf(this.getTile(p[0] + 1, p[1])) !== -1) {
			var newPath = this._copyArray(path);
			newPath.push([p[0] + 1, p[1]]);
			newPaths.push(newPath);
		}

		if (Tiles.MONSTER_TILES.indexOf(this.getTile(p[0], p[1] - 1)) !== -1) {
			var newPath = this._copyArray(path);
			newPath.push([p[0], p[1] - 1]);
			newPaths.push(newPath);
		}

		if (Tiles.MONSTER_TILES.indexOf(this.getTile(p[0], p[1] + 1)) !== -1) {
			var newPath = this._copyArray(path);
			newPath.push([p[0], p[1] + 1]);
			newPaths.push(newPath);
		}

		return
	}

	_copyArray(array) {
		var newArr = [];
		for (var i = 0; i < array.length; i++) {
			newArr[i] = array[i];
		}
		return newArr;
	}

	_addPointsToArray(array, points) {
		for (var ii = 0; ii < points.length; ii++) {
			array.push(points[ii]);
		}

		return array;
	}

	update() {

		if (this.playerXOff > 0) this.playerXOff -= 2;
		else if (this.playerXOff < 0) this.playerXOff += 2;

		if (this.playerYOff > 0) this.playerYOff -= 2;
		else if (this.playerYOff < 0) this.playerYOff += 2;

		if (this.playerXOff == 0 && this.playerYOff == 0 && this.alive) {
			var tile = this.getTile(this.playerX, this.playerY);
			var moved = (Tiles.ICE_TILES.indexOf(tile) !== -1 && !this.hasSkates) || (Tiles.BOOST_TILES.indexOf(tile) !== -1 && !this.hasStickyBoots);
			if (!moved) {
				if (this.keyboard.isKeyDown("left")) {
					this.dir = Defs.DIRS.LEFT;
					moved = true;
				} else if (this.keyboard.isKeyDown("right")) {
					this.dir = Defs.DIRS.RIGHT;
					moved = true;
				} else if (this.keyboard.isKeyDown("up")) {
					this.dir = Defs.DIRS.UP;
					moved = true;
				} else if (this.keyboard.isKeyDown("down")) {
					this.dir = Defs.DIRS.DOWN;
					moved = true;
				}
			} else {
				switch (tile) {
					case Tiles.TILES.ICE_BUMPER_TOP_LEFT:
						if (this.dir == Defs.DIRS.LEFT) this.dir = Defs.DIRS.DOWN;
						else if (this.dir == Defs.DIRS.UP) this.dir = Defs.DIRS.RIGHT;
						break;
					case Tiles.TILES.ICE_BUMPER_TOP_RIGHT:
						if (this.dir == Defs.DIRS.RIGHT) this.dir = Defs.DIRS.DOWN;
						else if (this.dir == Defs.DIRS.UP) this.dir = Defs.DIRS.LEFT;
						break;
					case Tiles.TILES.ICE_BUMPER_BOTTOM_LEFT:
						if (this.dir == Defs.DIRS.LEFT) this.dir = Defs.DIRS.UP;
						else if (this.dir == Defs.DIRS.DOWN) this.dir = Defs.DIRS.RIGHT;
						break;
					case Tiles.TILES.ICE_BUMPER_BOTTOM_RIGHT:
						if (this.dir == Defs.DIRS.RIGHT) this.dir = Defs.DIRS.UP;
						else if (this.dir == Defs.DIRS.DOWN) this.dir = Defs.DIRS.LEFT;
						break;
					case Tiles.TILES.BOOST_UP:
						this.dir = Defs.DIRS.UP;
						break;
					case Tiles.TILES.BOOST_DOWN:
						this.dir = Defs.DIRS.DOWN;
						break;
					case Tiles.TILES.BOOST_LEFT:
						this.dir = Defs.DIRS.LEFT;
						break;
					case Tiles.TILES.BOOST_RIGHT:
						this.dir = Defs.DIRS.RIGHT;
						break;
				}
			}

			if (moved) {
				switch (this.dir) {
					case Defs.DIRS.LEFT:
						if (this.canMove(this.playerX - 1, this.playerY)) {
							this.move(this.playerX - 1, this.playerY);
							this.playerXOff = Defs.TILE_SIZE;
						} else this.sliding = false;
						break;

					case Defs.DIRS.RIGHT:
						if (this.canMove(this.playerX + 1, this.playerY)) {
							this.move(this.playerX + 1, this.playerY);
							this.playerXOff = -Defs.TILE_SIZE;
						} else this.sliding = false;
						break;

					case Defs.DIRS.UP:
						if (this.canMove(this.playerX, this.playerY - 1)) {
							this.move(this.playerX, this.playerY - 1);
							this.playerYOff = Defs.TILE_SIZE;
						} else this.sliding = false;
						break;

					case Defs.DIRS.DOWN:
						if (this.canMove(this.playerX, this.playerY + 1)) {
							this.move(this.playerX, this.playerY + 1);
							this.playerYOff = -Defs.TILE_SIZE;
						} else this.sliding = false;
						break;
				}

				for (var i = 0; i < this.monsters.length; i++) {
					// TODO: A* or something
					//this.moveMonster(this.monsters[i]);
				}
			}
		}
	}

	draw() {
		var startX = this.playerX - ~~(this.screenTileWidth / 2);
		var startY = this.playerY - ~~(this.screenTileHeight / 2);
		for (var y = startY; y < startY + this.screenTileHeight; y++) {
			for (var x = startX; x < startX + this.screenTileWidth; x++) {
				var tile = this.getTile(x, y);
				if (Tiles.TILE_ALIASES.hasOwnProperty(tile)) {
					var spriteName = Tiles.TILE_ALIASES[tile];
					this.screen.drawSprite(spriteName, (x - startX)* Defs.TILE_SIZE, (y - startY)* Defs.TILE_SIZE, Defs.TILE_SIZE, Defs.TILE_SIZE);
				} else console.error("Undefined tile ID: '" + tile + "'");
			}
		}

		var tile = this.getTile(this.playerX, this.playerY);
		if (tile == Tiles.TILES.WATER) {
			if (!this.alive && this.playerXOff == 0 && this.playerYOff == 0) {
				this.screen.drawSprite('SPLASH', ~~(this.screenTileWidth / 2) * Defs.TILE_SIZE, ~~(this.screenTileHeight / 2) * Defs.TILE_SIZE, Defs.TILE_SIZE, Defs.TILE_SIZE);
			} else {
				this.screen.drawFromSpritesheet("PLAYER_SWIMMING", 32, 32, this.dir, ~~(this.screenTileWidth / 2) * Defs.TILE_SIZE + this.playerXOff, ~~(this.screenTileHeight / 2) * Defs.TILE_SIZE + this.playerYOff);
			}
		} else if (tile == Tiles.TILES.FIRE && !this.alive && this.playerXOff == 0 && this.playerYOff == 0) {
			this.screen.drawSprite('BURNT', ~~(this.screenTileWidth / 2) * Defs.TILE_SIZE, ~~(this.screenTileHeight / 2) * Defs.TILE_SIZE, Defs.TILE_SIZE, Defs.TILE_SIZE);
		} else {
			this.screen.drawFromSpritesheet("PLAYER", 32, 32, this.dir, ~~(this.screenTileWidth / 2) * Defs.TILE_SIZE + this.playerXOff, ~~(this.screenTileHeight / 2) * Defs.TILE_SIZE + this.playerYOff);
		}

		for (var i = 0; i < this.monsters.length; i++) {
			var m = this.monsters[i];
			this.screen.drawFromSpritesheet("MONSTER", 32, 32, m.dir, (m.x - startX) * Defs.TILE_SIZE + m.xOff, (m.y - startY) * Defs.TILE_SIZE + m.yOff);
		}

		if (Defs.DEBUG) {
			this.screen.drawText("fps: " + MainLoop.getFPS().toString().substring(0, 4), 10, 10, "#FFFFFF");
		}

		this.screen.drawText("CHIPS: " + this.chipsRemaining, 10, 20, "#FFFFFF");

		this.screen.show();
	}

	getTile(x, y) {
		if (x < 0 || x >= this.mapWidth || y < 0 || y >= this.mapHeight) return Tiles.TILES.FLOOR;

		return this.map[y][x];
	}

	setTile(x, y, id) {
		if (x < 0 || x >= this.mapWidth || y < 0 || y >= this.mapHeight) return;

		this.map[y][x] = id;
	}
}

export default new Core();
