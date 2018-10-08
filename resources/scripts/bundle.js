/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Core.js":
/*!*********************!*\
  !*** ./src/Core.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Registry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Registry */ \"./src/Registry.js\");\n/* harmony import */ var _Defs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Defs */ \"./src/Defs.js\");\n/* harmony import */ var _Keyboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Keyboard */ \"./src/Keyboard.js\");\n/* harmony import */ var _Mouse__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Mouse */ \"./src/Mouse.js\");\n/* harmony import */ var _Screen__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Screen */ \"./src/Screen.js\");\n/* harmony import */ var _Tiles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Tiles */ \"./src/Tiles.js\");\n/* harmony import */ var _mainloop__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mainloop */ \"./src/mainloop.js\");\n/* harmony import */ var _mainloop__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mainloop__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\n\nclass Core {\n  constructor() {\n    this.gameState = undefined;\n    this.keyboard = undefined;\n    this.mouse = undefined;\n    this.map = [[]];\n    this.mapWidth = 0;\n    this.mapHeight = 0;\n    this.screenTileWidth = 0;\n    this.screenTileHeight = 0;\n    this.alive = true;\n    this.chipsRemaining = 0;\n    this.playerX = 1;\n    this.playerY = 1;\n    this.playerXOff = 0;\n    this.playerYOff = 0;\n    this.dir = _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRS.DOWN;\n    this.hasFlippers = false;\n    this.hasFireBoots = false;\n    this.hasStickyBoots = false;\n    this.hasSkates = false;\n    this.hasKeyA = false;\n    this.hasKeyB = false;\n    this.hasKeyC = false;\n    this.hasKeyD = false;\n    this.monsters = [];\n  }\n\n  init(canvas) {\n    this.canvas = canvas;\n    this.screenTileWidth = Math.ceil(canvas.width / _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TILE_SIZE);\n    this.screenTileHeight = Math.ceil(canvas.height / _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TILE_SIZE);\n    this.screen = new _Screen__WEBPACK_IMPORTED_MODULE_4__[\"default\"](canvas);\n    this.screen.backgroundColor = \"#FF1493\";\n    _mainloop__WEBPACK_IMPORTED_MODULE_6___default.a.setMaxAllowedFPS(_Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].FRAMERATE);\n    _mainloop__WEBPACK_IMPORTED_MODULE_6___default.a.setUpdate(() => this.update());\n    _mainloop__WEBPACK_IMPORTED_MODULE_6___default.a.setDraw(() => this.draw());\n    this.keyboard = new _Keyboard__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n    this.mouse = new _Mouse__WEBPACK_IMPORTED_MODULE_3__[\"default\"](canvas);\n  }\n\n  start() {\n    this.gameState = _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].PLAY_STATE;\n    this.map = _Registry__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getMap('test');\n    this.mapWidth = this.map[0].length;\n    this.mapHeight = this.map.length;\n    this.chipsRemaining = 0;\n    this.findTile(_Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.CHIP, () => {\n      this.chipsRemaining++;\n    });\n    this.findTile('*', (x, y) => {\n      this.playerX = x;\n      this.playerY = y;\n      this.setTile(x, y, _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.FLOOR);\n    });\n    this.findTile('M', (x, y) => {\n      this.monsters.push({\n        x: x,\n        y: y,\n        xOff: 0,\n        yOff: 0,\n        dir: _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DOWN\n      });\n      this.setTile(x, y, _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.FLOOR);\n    });\n    _mainloop__WEBPACK_IMPORTED_MODULE_6___default.a.start();\n    console.log(\"Started game.\");\n  }\n\n  findTile(tileId, callback) {\n    for (var y = 0; y < this.mapHeight; y++) {\n      for (var x = 0; x < this.mapWidth; x++) {\n        if (this.map[y][x] == tileId) callback(x, y);\n      }\n    }\n  }\n\n  intersects(x0, y0, w0, h0, x1, y1, w1, h1) {\n    return !(x0 > x1 + w1 || x0 + w0 < x1 || y0 > y1 + h1 || y0 + h0 < y1);\n  }\n\n  canMove(x, y) {\n    var tile = this.getTile(x, y);\n\n    if (_Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].LOCK_TILES.indexOf(tile) !== -1) {\n      if (tile == _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.LOCK_A && this.hasKeyA || tile == _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.LOCK_B && this.hasKeyB || tile == _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.LOCK_C && this.hasKeyC || tile == _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.LOCK_D && this.hasKeyD) {\n        this.setTile(x, y, _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.FLOOR);\n      } else return false;\n    }\n\n    return _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].SOLID_TILES.indexOf(tile) === -1;\n  }\n\n  move(x, y) {\n    this.playerX = x;\n    this.playerY = y;\n    var tile = this.getTile(x, y);\n\n    if (tile == _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.CHIP) {\n      this.chipsRemaining--;\n\n      if (this.chipsRemaining == 0) {\n        var scope = this;\n        this.findTile(_Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.CHIP_GATE, function (x, y) {\n          scope.setTile(x, y, _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.FLOOR);\n        });\n      }\n\n      this.setTile(x, y, _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.FLOOR);\n    } else if (tile == _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.WATER && !this.hasFlippers) {\n      this.alive = false; // DROWN\n    } else if (tile == _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.FIRE && !this.hasFireBoots) {\n      this.alive = false; // BURN\n    } else if (tile == _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.FLIPPERS) {\n      this.hasFlippers = true;\n      this.setTile(x, y, _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.FLOOR);\n    } else if (tile == _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.FIRE_BOOTS) {\n      this.hasFireBoots = true;\n      this.setTile(x, y, _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.FLOOR);\n    } else if (tile == _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.SKATES) {\n      this.hasSkates = true;\n      this.setTile(x, y, _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.FLOOR);\n    } else if (tile == _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.STICKY_BOOTS) {\n      this.hasStickyBoots = true;\n      this.setTile(x, y, _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.FLOOR);\n    } else if (tile == _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.KEY_A) {\n      this.hasKeyA = true;\n      this.setTile(x, y, _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.FLOOR);\n    } else if (tile == _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.KEY_B) {\n      this.hasKeyB = true;\n      this.setTile(x, y, _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.FLOOR);\n    } else if (tile == _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.KEY_C) {\n      this.hasKeyC = true;\n      this.setTile(x, y, _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.FLOOR);\n    } else if (tile == _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.KEY_D) {\n      this.hasKeyD = true;\n      this.setTile(x, y, _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.FLOOR);\n    }\n  }\n\n  moveMonster(monster) {\n    var goal = [this.playerX, this.playerY];\n    var paths = [[monster.x, monster.y]];\n    var usedPoints = [[monster.x, monster.y]];\n\n    while (true) {\n      var newPaths = [];\n\n      for (var i = 0; i < paths.length; i++) {\n        result = this._calcPath(paths[i], usedPoints, goal);\n        newPaths.concat(result.paths);\n\n        for (var i = 0; i < result.paths.length; i++) {\n          usedPoints = this._addPointsToArray(usedPoints, result.paths[i]);\n        }\n      }\n\n      paths = newPaths;\n    }\n  }\n  /********\n  *\n  * TODO: Finish pathfinding.\n  *\n  ********/\n  // Path: [[x,y], [x,y], ..., [x,y]] of starting point to current point\n  // usedPoints: array of points that have been used by the algorithm, the sum of all paths\n  // goal: the ending point\n\n\n  _calcPath(path, usedPoints, goal) {\n    if (path.length === 0) return;\n    var newPaths = [];\n    var p = path[path.length - 1]; // The current point;\n\n    if (_Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].MONSTER_TILES.indexOf(this.getTile(p[0] - 1, p[1])) !== -1) {\n      var newPath = this._copyArray(path);\n\n      newPath.push([p[0] - 1, p[1]]);\n      newPaths.push(newPath);\n    }\n\n    if (_Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].MONSTER_TILES.indexOf(this.getTile(p[0] + 1, p[1])) !== -1) {\n      var newPath = this._copyArray(path);\n\n      newPath.push([p[0] + 1, p[1]]);\n      newPaths.push(newPath);\n    }\n\n    if (_Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].MONSTER_TILES.indexOf(this.getTile(p[0], p[1] - 1)) !== -1) {\n      var newPath = this._copyArray(path);\n\n      newPath.push([p[0], p[1] - 1]);\n      newPaths.push(newPath);\n    }\n\n    if (_Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].MONSTER_TILES.indexOf(this.getTile(p[0], p[1] + 1)) !== -1) {\n      var newPath = this._copyArray(path);\n\n      newPath.push([p[0], p[1] + 1]);\n      newPaths.push(newPath);\n    }\n\n    return;\n  }\n\n  _copyArray(array) {\n    var newArr = [];\n\n    for (var i = 0; i < array.length; i++) {\n      newArr[i] = array[i];\n    }\n\n    return newArr;\n  }\n\n  _addPointsToArray(array, points) {\n    for (var ii = 0; ii < points.length; ii++) {\n      array.push(points[ii]);\n    }\n\n    return array;\n  }\n\n  update() {\n    if (this.playerXOff > 0) this.playerXOff -= 2;else if (this.playerXOff < 0) this.playerXOff += 2;\n    if (this.playerYOff > 0) this.playerYOff -= 2;else if (this.playerYOff < 0) this.playerYOff += 2;\n\n    if (this.playerXOff == 0 && this.playerYOff == 0 && this.alive) {\n      var tile = this.getTile(this.playerX, this.playerY);\n      var moved = _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].ICE_TILES.indexOf(tile) !== -1 && !this.hasSkates || _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].BOOST_TILES.indexOf(tile) !== -1 && !this.hasStickyBoots;\n\n      if (!moved) {\n        if (this.keyboard.isKeyDown(\"left\")) {\n          this.dir = _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRS.LEFT;\n          moved = true;\n        } else if (this.keyboard.isKeyDown(\"right\")) {\n          this.dir = _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRS.RIGHT;\n          moved = true;\n        } else if (this.keyboard.isKeyDown(\"up\")) {\n          this.dir = _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRS.UP;\n          moved = true;\n        } else if (this.keyboard.isKeyDown(\"down\")) {\n          this.dir = _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRS.DOWN;\n          moved = true;\n        }\n      } else {\n        switch (tile) {\n          case _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.ICE_BUMPER_TOP_LEFT:\n            if (this.dir == _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRS.LEFT) this.dir = _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRS.DOWN;else if (this.dir == _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRS.UP) this.dir = _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRS.RIGHT;\n            break;\n\n          case _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.ICE_BUMPER_TOP_RIGHT:\n            if (this.dir == _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRS.RIGHT) this.dir = _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRS.DOWN;else if (this.dir == _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRS.UP) this.dir = _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRS.LEFT;\n            break;\n\n          case _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.ICE_BUMPER_BOTTOM_LEFT:\n            if (this.dir == _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRS.LEFT) this.dir = _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRS.UP;else if (this.dir == _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRS.DOWN) this.dir = _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRS.RIGHT;\n            break;\n\n          case _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.ICE_BUMPER_BOTTOM_RIGHT:\n            if (this.dir == _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRS.RIGHT) this.dir = _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRS.UP;else if (this.dir == _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRS.DOWN) this.dir = _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRS.LEFT;\n            break;\n\n          case _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.BOOST_UP:\n            this.dir = _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRS.UP;\n            break;\n\n          case _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.BOOST_DOWN:\n            this.dir = _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRS.DOWN;\n            break;\n\n          case _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.BOOST_LEFT:\n            this.dir = _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRS.LEFT;\n            break;\n\n          case _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.BOOST_RIGHT:\n            this.dir = _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRS.RIGHT;\n            break;\n        }\n      }\n\n      if (moved) {\n        switch (this.dir) {\n          case _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRS.LEFT:\n            if (this.canMove(this.playerX - 1, this.playerY)) {\n              this.move(this.playerX - 1, this.playerY);\n              this.playerXOff = _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TILE_SIZE;\n            } else this.sliding = false;\n\n            break;\n\n          case _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRS.RIGHT:\n            if (this.canMove(this.playerX + 1, this.playerY)) {\n              this.move(this.playerX + 1, this.playerY);\n              this.playerXOff = -_Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TILE_SIZE;\n            } else this.sliding = false;\n\n            break;\n\n          case _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRS.UP:\n            if (this.canMove(this.playerX, this.playerY - 1)) {\n              this.move(this.playerX, this.playerY - 1);\n              this.playerYOff = _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TILE_SIZE;\n            } else this.sliding = false;\n\n            break;\n\n          case _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRS.DOWN:\n            if (this.canMove(this.playerX, this.playerY + 1)) {\n              this.move(this.playerX, this.playerY + 1);\n              this.playerYOff = -_Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TILE_SIZE;\n            } else this.sliding = false;\n\n            break;\n        }\n\n        for (var i = 0; i < this.monsters.length; i++) {// TODO: A* or something\n          //this.moveMonster(this.monsters[i]);\n        }\n      }\n    }\n  }\n\n  draw() {\n    var startX = this.playerX - ~~(this.screenTileWidth / 2);\n    var startY = this.playerY - ~~(this.screenTileHeight / 2);\n\n    for (var y = startY; y < startY + this.screenTileHeight; y++) {\n      for (var x = startX; x < startX + this.screenTileWidth; x++) {\n        var tile = this.getTile(x, y);\n\n        if (_Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILE_ALIASES.hasOwnProperty(tile)) {\n          var spriteName = _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILE_ALIASES[tile];\n          this.screen.drawSprite(spriteName, (x - startX) * _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TILE_SIZE, (y - startY) * _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TILE_SIZE, _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TILE_SIZE, _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TILE_SIZE);\n        } else console.error(\"Undefined tile ID: '\" + tile + \"'\");\n      }\n    }\n\n    var tile = this.getTile(this.playerX, this.playerY);\n\n    if (tile == _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.WATER) {\n      if (!this.alive && this.playerXOff == 0 && this.playerYOff == 0) {\n        this.screen.drawSprite('SPLASH', ~~(this.screenTileWidth / 2) * _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TILE_SIZE, ~~(this.screenTileHeight / 2) * _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TILE_SIZE, _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TILE_SIZE, _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TILE_SIZE);\n      } else {\n        this.screen.drawFromSpritesheet(\"PLAYER_SWIMMING\", 32, 32, this.dir, ~~(this.screenTileWidth / 2) * _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TILE_SIZE + this.playerXOff, ~~(this.screenTileHeight / 2) * _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TILE_SIZE + this.playerYOff);\n      }\n    } else if (tile == _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.FIRE && !this.alive && this.playerXOff == 0 && this.playerYOff == 0) {\n      this.screen.drawSprite('BURNT', ~~(this.screenTileWidth / 2) * _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TILE_SIZE, ~~(this.screenTileHeight / 2) * _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TILE_SIZE, _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TILE_SIZE, _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TILE_SIZE);\n    } else {\n      this.screen.drawFromSpritesheet(\"PLAYER\", 32, 32, this.dir, ~~(this.screenTileWidth / 2) * _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TILE_SIZE + this.playerXOff, ~~(this.screenTileHeight / 2) * _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TILE_SIZE + this.playerYOff);\n    }\n\n    for (var i = 0; i < this.monsters.length; i++) {\n      var m = this.monsters[i];\n      this.screen.drawFromSpritesheet(\"MONSTER\", 32, 32, m.dir, (m.x - startX) * _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TILE_SIZE + m.xOff, (m.y - startY) * _Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TILE_SIZE + m.yOff);\n    }\n\n    if (_Defs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DEBUG) {\n      this.screen.drawText(\"fps: \" + _mainloop__WEBPACK_IMPORTED_MODULE_6___default.a.getFPS().toString().substring(0, 4), 10, 10, \"#FFFFFF\");\n    }\n\n    this.screen.drawText(\"CHIPS: \" + this.chipsRemaining, 10, 20, \"#FFFFFF\");\n    this.screen.show();\n  }\n\n  getTile(x, y) {\n    if (x < 0 || x >= this.mapWidth || y < 0 || y >= this.mapHeight) return _Tiles__WEBPACK_IMPORTED_MODULE_5__[\"default\"].TILES.FLOOR;\n    return this.map[y][x];\n  }\n\n  setTile(x, y, id) {\n    if (x < 0 || x >= this.mapWidth || y < 0 || y >= this.mapHeight) return;\n    this.map[y][x] = id;\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new Core());\n\n//# sourceURL=webpack:///./src/Core.js?");

/***/ }),

/***/ "./src/Defs.js":
/*!*********************!*\
  !*** ./src/Defs.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst Defs = {\n  DEBUG: true,\n  FRAMERATE: 60,\n  PLAY_STATE: 0,\n  MENU_STATE: 1,\n  TILE_SIZE: 32,\n  DIRS: {\n    LEFT: 0,\n    RIGHT: 1,\n    UP: 2,\n    DOWN: 3\n  },\n  KEY_CODES: {\n    37: \"left\",\n    // arrow keys\n    38: \"up\",\n    // ^\n    39: \"right\",\n    // ^\n    40: \"down\",\n    // ^\n    65: \"left\",\n    // A\n    83: \"down\",\n    // S\n    68: \"right\",\n    // D\n    87: \"up\" // W\n\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Defs);\n\n//# sourceURL=webpack:///./src/Defs.js?");

/***/ }),

/***/ "./src/Keyboard.js":
/*!*************************!*\
  !*** ./src/Keyboard.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Keyboard; });\n/* harmony import */ var _Defs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Defs */ \"./src/Defs.js\");\n\nclass Keyboard {\n  constructor() {\n    this.keys = {\n      \"left\": false,\n      \"right\": false,\n      \"up\": false,\n      \"down\": false\n    };\n    window.addEventListener(\"keydown\", evt => this.onKeyDown(evt));\n    window.addEventListener(\"keyup\", evt => this.onKeyUp(evt));\n  }\n\n  isKeyDown(c) {\n    return this.keys[c];\n  }\n\n  setKey(c, pressed) {\n    if (_Defs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].KEY_CODES.hasOwnProperty(c)) {\n      this.keys[_Defs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].KEY_CODES[c]] = pressed;\n    } else {//console.log(c);\n    }\n  }\n\n  onKeyDown(e) {\n    this.setKey(e.keyCode, true);\n  }\n\n  onKeyUp(e) {\n    this.setKey(e.keyCode, false);\n  }\n\n}\n\n//# sourceURL=webpack:///./src/Keyboard.js?");

/***/ }),

/***/ "./src/Mouse.js":
/*!**********************!*\
  !*** ./src/Mouse.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Mouse; });\nclass Mouse {\n  constructor(canvas) {\n    this.pos = {\n      x: 0,\n      y: 0\n    };\n    this.clicked = false;\n    this.clickPos = {\n      x: 0,\n      y: 0\n    };\n    canvas.addEventListener('mousemove', evt => {\n      var rect = canvas.getBoundingClientRect();\n      this.mouseMove(evt, rect);\n    }, false);\n    canvas.addEventListener('click', evt => {\n      var rect = canvas.getBoundingClientRect();\n      this.onClick(evt, rect);\n    }, false);\n  }\n\n  onClick(evt, rect) {\n    this.clicked = true;\n    this.clickPos.x = evt.clientX - rect.left;\n    this.clickPos.y = evt.clientY - rect.top;\n  }\n\n  clickHandled() {\n    clicked = false;\n  }\n\n  mouseMove(evt, rect) {\n    this.pos.x = evt.clientX - rect.left;\n    this.pos.y = evt.clientY - rect.top;\n  }\n\n}\n\n//# sourceURL=webpack:///./src/Mouse.js?");

/***/ }),

/***/ "./src/Registry.js":
/*!*************************!*\
  !*** ./src/Registry.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Registry {\n  constructor() {\n    this.loaded = false;\n    this.images = {};\n    this.maps = {};\n  }\n\n  loadResources() {\n    if (this.loaded === true) {\n      console.log(\"Resources are already loaded.\");\n      return;\n    }\n\n    var resources = document.getElementById(\"resources\").children;\n\n    for (var i = 0; i < resources.length; i++) {\n      this._registerResource(resources[i]);\n    }\n\n    var interval = setInterval(() => {\n      if (this._isLoaded()) {\n        this.loaded = true;\n        console.log(\"Finished loading resources.\");\n        clearInterval(interval);\n      }\n    }, 200);\n  }\n\n  _isLoaded() {\n    for (let map in this.maps) {\n      if (this.maps[map] === false) return false;\n    }\n\n    return true;\n  }\n\n  _registerResource(element) {\n    var idSplit = element.id.split(\":\");\n    var type = idSplit[0];\n    var name = idSplit[1];\n\n    if (type == \"image\") {\n      this.images[name] = element;\n      console.log(\"Registered image: \" + name);\n    } else if (type == \"map\") {\n      this.maps[name] = false;\n      var client = new XMLHttpRequest();\n      client.open('GET', element.href);\n\n      client.onreadystatechange = state => {\n        if (client.readyState == 4) {\n          var map = client.responseText.split('\\n');\n\n          for (var y = 0; y < map.length; y++) {\n            var row = map[y].replace(/ /g, '_').trim();\n            map[y] = [];\n\n            for (var x = 0; x < row.length; x++) {\n              map[y][x] = row[x];\n            }\n          }\n\n          this.maps[name] = map;\n          console.log(\"Registered map: \" + name);\n        }\n      };\n\n      client.send();\n    }\n  }\n\n  getImage(name) {\n    if (this.images.hasOwnProperty(name)) {\n      return this.images[name];\n    } else {\n      console.warn(\"No image with name: \" + name);\n      return null;\n    }\n  }\n\n  getMap(name) {\n    if (this.maps.hasOwnProperty(name)) {\n      return this.maps[name];\n    } else {\n      console.warn(\"No map with name: \" + name);\n      return [[0]];\n    }\n  }\n\n}\n\n;\n/* harmony default export */ __webpack_exports__[\"default\"] = (new Registry());\n\n//# sourceURL=webpack:///./src/Registry.js?");

/***/ }),

/***/ "./src/Screen.js":
/*!***********************!*\
  !*** ./src/Screen.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Screen; });\n/* harmony import */ var _Registry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Registry */ \"./src/Registry.js\");\n\nclass Screen {\n  constructor(canvas) {\n    this.buffer = document.createElement(\"canvas\");\n    this.canvas = canvas;\n    this.buffer.width = this.canvas.width;\n    this.buffer.height = this.canvas.height;\n    this.bufferContext = this.buffer.getContext(\"2d\");\n    this.context = this.canvas.getContext(\"2d\");\n    this.bufferContext.font = \"8px 'Lucida Sans Typewriter'\";\n    this.width = this.canvas.width;\n    this.height = this.canvas.height;\n    this.backgroundColor = \"#FFFFFF\";\n    this.xOff = 0;\n    this.yOff = 0;\n  }\n\n  show() {\n    this.context.drawImage(this.buffer, 0, 0);\n    this.drawRect(this.backgroundColor, 0, 0, this.width, this.height);\n  }\n\n  drawRect(color, x, y, w, h) {\n    this.bufferContext.fillStyle = color;\n    this.bufferContext.fillRect(x + this.xOff, y + this.yOff, w, h);\n  }\n\n  drawText(text, x, y, color) {\n    if (color != undefined) {\n      this.bufferContext.fillStyle = color;\n    }\n\n    this.bufferContext.fillText(text, x, y);\n  }\n\n  drawSprite(spriteName, x, y, w, h) {\n    var img = _Registry__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getImage(spriteName);\n\n    if (img == null) {\n      console.error(\"Couldn't find sprite: \" + spriteName);\n      return;\n    }\n\n    if (w === undefined || h === undefined) {\n      this.bufferContext.drawImage(img, x + this.xOff, y + this.yOff);\n    } else {\n      this.bufferContext.drawImage(img, 0, 0, img.width, img.height, x + this.xOff, y + this.yOff, w, h);\n    }\n  }\n\n  drawFromSpritesheet(sheet, spriteW, spriteH, index, x, y) {\n    var img = _Registry__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getImage(sheet);\n    this.bufferContext.drawImage(img, spriteW * index, 0, spriteW, spriteH, x + this.xOff, y + this.yOff, spriteW, spriteH);\n  }\n\n  drawTile(tileset, tileID, tileX, tileY) {\n    var img = _Registry__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getImage(tileset);\n    var left = tileID == Core.getTileID(tileX - 1, tileY);\n    var right = tileID == Core.getTileID(tileX + 1, tileY);\n    var up = tileID == Core.getTileID(tileX, tileY - 1);\n    var down = tileID == Core.getTileID(tileX, tileY + 1);\n    var left_up = tileID == Core.getTileID(tileX - 1, tileY);\n    var left_down = tileID == Core.getTileID(tileX - 1, tileY);\n    var right_up = tileID == Core.getTileID(tileX - 1, tileY);\n    var right_down = tileID == Core.getTileID(tileX - 1, tileY);\n  }\n\n  setOffset(xOffset, yOffset) {\n    this.xOff = xOffset;\n    this.yOff = yOffset;\n  }\n\n}\n\n//# sourceURL=webpack:///./src/Screen.js?");

/***/ }),

/***/ "./src/Tiles.js":
/*!**********************!*\
  !*** ./src/Tiles.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst TILES = {\n  BLOCK: '1',\n  FLOOR: '_',\n  INFO: '?',\n  WATER: 'W',\n  ICE: 'I',\n  ICE_BUMPER_TOP_LEFT: 'L',\n  ICE_BUMPER_TOP_RIGHT: 'R',\n  ICE_BUMPER_BOTTOM_LEFT: 'l',\n  ICE_BUMPER_BOTTOM_RIGHT: 'r',\n  FIRE: 'F',\n  CHIP: '#',\n  CHIP_GATE: '=',\n  GOAL: '@',\n  FLIPPERS: 'w',\n  FIRE_BOOTS: 'f',\n  SKATES: 'i',\n  STICKY_BOOTS: 'g',\n  BOOST_UP: '^',\n  BOOST_DOWN: 'v',\n  BOOST_LEFT: '<',\n  BOOST_RIGHT: '>',\n  LOCK_A: 'A',\n  LOCK_B: 'B',\n  LOCK_C: 'C',\n  LOCK_D: 'D',\n  KEY_A: 'a',\n  KEY_B: 'b',\n  KEY_C: 'c',\n  KEY_D: 'd'\n}; // The reverse object of TILES\n\nconst TILE_ALIASES = {};\n\nfor (let key in TILES) {\n  if (TILES.hasOwnProperty(key)) {\n    TILE_ALIASES[TILES[key]] = key;\n  }\n} // Tiles that the monster can cross over\n\n\nconst MONSTER_TILES = [TILES.FLOOR, TILES.INFO];\nconst SOLID_TILES = [TILES.BLOCK, TILES.CHIP_GATE];\nconst ICE_TILES = [TILES.ICE, TILES.ICE_BUMPER_BOTTOM_RIGHT, TILES.ICE_BUMPER_BOTTOM_LEFT, TILES.ICE_BUMPER_TOP_RIGHT, TILES.ICE_BUMPER_TOP_LEFT];\nconst BOOST_TILES = [TILES.BOOST_UP, TILES.BOOST_DOWN, TILES.BOOST_LEFT, TILES.BOOST_RIGHT];\nconst LOCK_TILES = [TILES.LOCK_A, TILES.LOCK_B, TILES.LOCK_C, TILES.LOCK_D];\nconst Tiles = {\n  TILES,\n  TILE_ALIASES,\n  MONSTER_TILES,\n  SOLID_TILES,\n  ICE_TILES,\n  BOOST_TILES,\n  LOCK_TILES\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Tiles);\n\n//# sourceURL=webpack:///./src/Tiles.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Core */ \"./src/Core.js\");\n/* harmony import */ var _Registry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Registry */ \"./src/Registry.js\");\n\n\n\nwindow.onload = function () {\n  var canvas = document.getElementById(\"main-canvas\");\n  _Registry__WEBPACK_IMPORTED_MODULE_1__[\"default\"].loadResources();\n  _Core__WEBPACK_IMPORTED_MODULE_0__[\"default\"].init(canvas);\n  var interval = setInterval(function () {\n    if (_Registry__WEBPACK_IMPORTED_MODULE_1__[\"default\"].loaded) {\n      _Core__WEBPACK_IMPORTED_MODULE_0__[\"default\"].start();\n      clearInterval(interval);\n    }\n  }, 200);\n};\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/mainloop.js":
/*!*************************!*\
  !*** ./src/mainloop.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;// From https://github.com/IceCreamYou/MainLoop.js\n(function (root) {\n  var simulationTimestep = 1000 / 60,\n      frameDelta = 0,\n      lastFrameTimeMs = 0,\n      fps = 60,\n      lastFpsUpdate = 0,\n      framesThisSecond = 0,\n      numUpdateSteps = 0,\n      minFrameDelay = 0,\n      running = false,\n      started = false,\n      panic = false,\n      windowOrRoot = typeof window === 'object' ? window : root,\n      requestAnimationFrame = windowOrRoot.requestAnimationFrame || function () {\n    var lastTimestamp = Date.now(),\n        now,\n        timeout;\n    return function (callback) {\n      now = Date.now();\n      timeout = Math.max(0, simulationTimestep - (now - lastTimestamp));\n      lastTimestamp = now + timeout;\n      return setTimeout(function () {\n        callback(now + timeout);\n      }, timeout);\n    };\n  }(),\n      cancelAnimationFrame = windowOrRoot.cancelAnimationFrame || clearTimeout,\n      NOOP = function () {},\n      begin = NOOP,\n      update = NOOP,\n      draw = NOOP,\n      end = NOOP,\n      rafHandle;\n\n  root.MainLoop = {\n    getSimulationTimestep: function () {\n      return simulationTimestep;\n    },\n    setSimulationTimestep: function (timestep) {\n      simulationTimestep = timestep;\n      return this;\n    },\n    getFPS: function () {\n      return fps;\n    },\n    getMaxAllowedFPS: function () {\n      return 1000 / minFrameDelay;\n    },\n    setMaxAllowedFPS: function (fps) {\n      if (typeof fps === 'undefined') {\n        fps = Infinity;\n      }\n\n      if (fps === 0) {\n        this.stop();\n      } else {\n        minFrameDelay = 1000 / fps;\n      }\n\n      return this;\n    },\n    resetFrameDelta: function () {\n      var oldFrameDelta = frameDelta;\n      frameDelta = 0;\n      return oldFrameDelta;\n    },\n    setBegin: function (fun) {\n      begin = fun || begin;\n      return this;\n    },\n    setUpdate: function (fun) {\n      update = fun || update;\n      return this;\n    },\n    setDraw: function (fun) {\n      draw = fun || draw;\n      return this;\n    },\n    setEnd: function (fun) {\n      end = fun || end;\n      return this;\n    },\n    start: function () {\n      if (!started) {\n        started = true;\n        rafHandle = requestAnimationFrame(function (timestamp) {\n          draw(1);\n          running = true;\n          lastFrameTimeMs = timestamp;\n          lastFpsUpdate = timestamp;\n          framesThisSecond = 0;\n          rafHandle = requestAnimationFrame(animate);\n        });\n      }\n\n      return this;\n    },\n    stop: function () {\n      running = false;\n      started = false;\n      cancelAnimationFrame(rafHandle);\n      return this;\n    },\n    isRunning: function () {\n      return running;\n    }\n  };\n\n  function animate(timestamp) {\n    rafHandle = requestAnimationFrame(animate);\n\n    if (timestamp < lastFrameTimeMs + minFrameDelay) {\n      return;\n    }\n\n    frameDelta += timestamp - lastFrameTimeMs;\n    lastFrameTimeMs = timestamp;\n    begin(timestamp, frameDelta);\n\n    if (timestamp > lastFpsUpdate + 1000) {\n      fps = 0.25 * framesThisSecond + 0.75 * fps;\n      lastFpsUpdate = timestamp;\n      framesThisSecond = 0;\n    }\n\n    framesThisSecond++;\n    numUpdateSteps = 0;\n\n    while (frameDelta >= simulationTimestep) {\n      update(simulationTimestep);\n      frameDelta -= simulationTimestep;\n\n      if (++numUpdateSteps >= 240) {\n        panic = true;\n        break;\n      }\n    }\n\n    draw(frameDelta / simulationTimestep);\n    end(fps, panic);\n    panic = false;\n  }\n\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (root.MainLoop),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :\n\t\t\t\t__WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else {}\n})(this);\n\n//# sourceURL=webpack:///./src/mainloop.js?");

/***/ })

/******/ });