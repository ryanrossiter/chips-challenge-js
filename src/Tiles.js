
const TILES = {
	BLOCK: '1',
	FLOOR: '_',
	INFO: '?',
	WATER: 'W',
	ICE: 'I',
	ICE_BUMPER_TOP_LEFT: 'L',
	ICE_BUMPER_TOP_RIGHT: 'R',
	ICE_BUMPER_BOTTOM_LEFT: 'l',
	ICE_BUMPER_BOTTOM_RIGHT: 'r',
	FIRE: 'F',
	CHIP: '#',
	CHIP_GATE: '=',
	GOAL: '@',
	FLIPPERS: 'w',
	FIRE_BOOTS: 'f',
	SKATES: 'i',
	STICKY_BOOTS: 'g',
	BOOST_UP: '^',
	BOOST_DOWN: 'v',
	BOOST_LEFT: '<',
	BOOST_RIGHT: '>',
	LOCK_A: 'A',
	LOCK_B: 'B',
	LOCK_C: 'C',
	LOCK_D: 'D',
	KEY_A: 'a',
	KEY_B: 'b',
	KEY_C: 'c',
	KEY_D: 'd',
};

// The reverse object of TILES
const TILE_ALIASES = {};
for (let key in TILES) {
	if (TILES.hasOwnProperty(key)) {
		TILE_ALIASES[TILES[key]] = key;
	}
}

// Tiles that the monster can cross over
const MONSTER_TILES = [
	TILES.FLOOR,
	TILES.INFO
];

const SOLID_TILES = [
	TILES.BLOCK,
	TILES.CHIP_GATE
];

const ICE_TILES = [
	TILES.ICE,
	TILES.ICE_BUMPER_BOTTOM_RIGHT,
	TILES.ICE_BUMPER_BOTTOM_LEFT,
	TILES.ICE_BUMPER_TOP_RIGHT,
	TILES.ICE_BUMPER_TOP_LEFT
];

const BOOST_TILES = [
	TILES.BOOST_UP,
	TILES.BOOST_DOWN,
	TILES.BOOST_LEFT,
	TILES.BOOST_RIGHT
];

const LOCK_TILES = [
	TILES.LOCK_A,
	TILES.LOCK_B,
	TILES.LOCK_C,
	TILES.LOCK_D
];

const Tiles = {
	TILES,
	TILE_ALIASES,
	MONSTER_TILES,
	SOLID_TILES,
	ICE_TILES,
	BOOST_TILES,
	LOCK_TILES,
}

export default Tiles;