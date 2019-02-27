import Registry from '~/Registry';
import Defs from '~/Defs';
import Keyboard from '~/Keyboard';
import Mouse from '~/Mouse';
import Screen from '~/Screen';
import Tiles from '~/Tiles';
import MainLoop from '~/mainloop';

import SortedSet from '~/util/SortedSet';

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
		this.sliding = false;

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

	start(map) {
		this.gameState = Defs.PLAY_STATE;
		this.map = Registry.getMap(map);
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
				dir: Defs.DIRS.DOWN
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

	canMove(x, y, dir) {
		var tile = this.getTile(x, y);

		if (Tiles.LOCK_TILES.indexOf(tile) !== -1) {
			if ((tile == Tiles.TILES.LOCK_A && this.hasKeyA)
				|| (tile == Tiles.TILES.LOCK_B && this.hasKeyB)
				|| (tile == Tiles.TILES.LOCK_C && this.hasKeyC)
				|| (tile == Tiles.TILES.LOCK_D && this.hasKeyD)) {

				this.setTile(x, y, Tiles.TILES.FLOOR);
			} else return false;
		} else if (Tiles.ICE_TILES.indexOf(tile) !== -1) {
			if ((tile == Tiles.TILES.ICE_BUMPER_TOP_LEFT && (dir == Defs.DIRS.RIGHT || dir == Defs.DIRS.DOWN))
				|| (tile == Tiles.TILES.ICE_BUMPER_TOP_RIGHT && (dir == Defs.DIRS.LEFT || dir == Defs.DIRS.DOWN))
				|| (tile == Tiles.TILES.ICE_BUMPER_BOTTOM_LEFT && (dir == Defs.DIRS.RIGHT || dir == Defs.DIRS.UP))
				|| (tile == Tiles.TILES.ICE_BUMPER_BOTTOM_RIGHT && (dir == Defs.DIRS.LEFT || dir == Defs.DIRS.UP))) {
				return false;
			}
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
		} else if (tile == Tiles.TILES.ICE && !this.hasFireBoots) {
			this.sliding = true;
			// SLIDE
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
		console.log(this.monsters[0]);
		console.log(this.monsters[1]);
		// A*
		let hashPos = ([a, b]) => `${a}-${b}`;
		let getNextPoints = ([a, b, s]) => [
			[a - 1, b, s + 1],
			[a + 1, b, s + 1],
			[a, b - 1, s + 1],
			[a, b + 1, s + 1]
		];
		let dist = ([a0, a1], [b0, b1]) => Math.sqrt(Math.pow(a0 - b0, 2) + Math.pow(a1 - b1, 2));
		let goal = [this.playerX, this.playerY];
		let start = [monster.x, monster.y, 0];

		let nextPoints = new SortedSet();
		nextPoints.insert(dist(start, goal), start);
		let usedPoints = [hashPos(start)];
		let cameFrom = {
			[hashPos(start)]: start
		};

		while (nextPoints.size > 0) {
			let [score, p] = nextPoints.pop();
			let hp = hashPos(p);
			if (hp === hashPos(goal)) break;

			for (let np of getNextPoints(p)) {
				if (Tiles.MONSTER_TILES.indexOf(this.getTile(np[0], np[1])) === -1) continue;
				let hnp = hashPos(np);
				if (usedPoints.indexOf(hnp) === -1) {
					usedPoints.push(hnp);
					nextPoints.insert(np[2] + dist(np, goal), np);
					cameFrom[hnp] = p;
				} else if (np[2] < cameFrom[hnp][2]) {
					cameFrom[hnp] = p;
				}
			}
		}

		if (usedPoints.indexOf(hashPos(goal)) !== -1) {
			let last = goal;
			let last1 = null;
			while (hashPos(last) !== hashPos(start)) {
				last1 = last;
				last = cameFrom[hashPos(last)];
			}

			for (let m of this.monsters) {
				if (m === monster) continue;
				if (m.x === last1[0] && m.y === last1[1]) return;
			}

			let dx = Math.sign(monster.x - last1[0]);
			let dy = Math.sign(monster.y - last1[1]);
			monster.x = last1[0];
			monster.y = last1[1];
			monster.xOff = dx * Defs.TILE_SIZE;
			monster.yOff = dy * Defs.TILE_SIZE;
		}
	}

	update() {
		for (let m of this.monsters) {
			if (m.xOff > 0) m.xOff -= 2;
			else if (m.xOff < 0) m.xOff += 2;

			if (m.yOff > 0) m.yOff -= 2;
			else if (m.yOff < 0) m.yOff += 2;
		}

		if (this.playerXOff > 0) this.playerXOff -= 2;
		else if (this.playerXOff < 0) this.playerXOff += 2;

		if (this.playerYOff > 0) this.playerYOff -= 2;
		else if (this.playerYOff < 0) this.playerYOff += 2;

		if (this.playerXOff == 0 && this.playerYOff == 0 && this.alive) {
			var tile = this.getTile(this.playerX, this.playerY);
			var moved = (Tiles.ICE_TILES.indexOf(tile) !== -1 && !this.hasSkates && this.sliding) || (Tiles.BOOST_TILES.indexOf(tile) !== -1 && !this.hasStickyBoots);
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
				moved = false;
				switch (this.dir) {
					case Defs.DIRS.LEFT:
						if (this.canMove(this.playerX - 1, this.playerY, this.dir)) {
							moved = true;
							this.move(this.playerX - 1, this.playerY);
							this.playerXOff = Defs.TILE_SIZE;
						} else this.sliding = false;
						break;

					case Defs.DIRS.RIGHT:
						if (this.canMove(this.playerX + 1, this.playerY, this.dir)) {
							moved = true;
							this.move(this.playerX + 1, this.playerY);
							this.playerXOff = -Defs.TILE_SIZE;
						} else this.sliding = false;
						break;

					case Defs.DIRS.UP:
						if (this.canMove(this.playerX, this.playerY - 1, this.dir)) {
							moved = true;
							this.move(this.playerX, this.playerY - 1);
							this.playerYOff = Defs.TILE_SIZE;
						} else this.sliding = false;
						break;

					case Defs.DIRS.DOWN:
						if (this.canMove(this.playerX, this.playerY + 1, this.dir)) {
							moved = true;
							this.move(this.playerX, this.playerY + 1);
							this.playerYOff = -Defs.TILE_SIZE;
						} else this.sliding = false;
						break;
				}
			}

			if (moved) {
				for (var i = 0; i < this.monsters.length; i++) {
					this.moveMonster(this.monsters[i]);
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
