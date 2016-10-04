# chips-challenge-js
A (WIP) HTML5/JS clone of the 1989 game Chip's Challenge.

## Finished elements:
 - Player movement
 - Chips/Win condition
 - Water/Fire/Ice/"Push" tiles
 - Boots/Keys
 - Locks being accessible with applicable key
 
## Unfinished elements:
 - Enemy pathfinding (Partially finished in `core.js`)
 - Dirt "pushable" blocks
 - Gravel (Turns to floor tile when stepped on)
 - Teleporters
 - Info tiles
 
*Please feel free to add+merge missing features.*

---

# Level Design
The levels are stored as rectangular text files (row width is expected to be consistent) under `/static/resources/maps`.
Each character represents a tile on the map, here is the convention used:

| Tile/Entity   | Character(s) |
| ------------- | ------------ |
| Player        | `*`          |
| Wall          | `1`          |
| Floor         | `_` or SPACE |
| Chip          | `#`          |
| Chip Gate     | `=`          |
| Goal          | `@`          |
| Info          | `?`          |
| Water         | `W`          |
| Flippers      | `w`          |
| Fire          | `F`          |
| Fire Boots    | `f`          |
| Ice           | `I`          |
| Skates        | `i`          |
| Ice Bumper    | `?`          |
| Boost/Push    | `^v<>`       |
| Sticky Boots  | `g`          |
| Locks         | `ABCD`       |
| Keys          | `abcd`       |
| Monster (WIP) | `M`          |

I have started to recreate the "classic" Chip's Challenge levels ([Wiki](http://strategywiki.org/wiki/Chip%27s_Challenge)), they are located in `/static/resources/maps/official`.
Any contributions to the recreation effort are appreciated.
