import F from "./functional.js";
import List from "./list.js";
const {compose, map, filter, pipe, reduce} = F;

const Board = Object.create(null);

Board.zeroBoard = () => [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

const condense = filter((x) => x !== 0);

// ------------ TASK 1 : CREATING THE BOARD MOVEMENTS  ------------ //

// Tips:
// - Start with Board.left and try to derive the rest from those!
// - Play the game a bit and try to understand what is happening.
// - Try to understand what happens in one row and map it across
//   all the rows in the array!
// - Don't forget you might need to create other functions for that one to work!

// The condense function is your first and only clue! Think about what it does.

const condense = filter((x) => x !== 0);

Board.left = 

Board.right =

Board.up =

Board.down =

// ------------ TASK 2 : CALCULATING THE SCORE  ------------ //

// Calculating the score of the board (sum of all the values on the board)

Board.score =

// Check if a board has legal movements (it should return false if
// all possible movements will return the same board.)


// ------------ TASK 3 : LEGAL MOVES  ------------ //


Board.hasLegalMoves =

// Find the number of empty tiles in the board (Board.freeTiles)

// ------------ TASK 4 : FREE TILES  ------------ //

Board.freeTiles = 


// ------------ TASK 5 : ADDING RANDOM TILE TO BOARD  ------------ //

// Then, create a function (Board.withNewTile) that places a tile
// of a certain value (set as parameters) in one of the empty a freeTileN
// also set as a parameter.

Board.withNewTile = function (board, freeTileN, value) {

};

// Finally, create a function (Board.withRandomNewTile), which takes in
// a board as a parameter and then implements the Board.withNewTile function
// by calculating a random number between 1 and 2 and an arbitrary empty tile.


Board.withRandomNewTile = function (board) {
    // You can add anything else to the function that you deem necessary.
    // Eg. what if there are no empty tiles? What should be returned then?
    return Board.withNewTile();
};

// ------------ TASK 6 (OPTIONAL) : MOVEMENT OF EACH TILE  ------------ //


// Finally, this is the optional section that will allow you to potentially
// create the animations.

// Remember, if you want to create animations you will have to make some edits
// in the ui20148.js module and you will need to do some research.

// First, create the function Board.tileMovementLeft, this function must return
// a board of the same dimensions as the original (4 by 4) but each cell will
// contain the amount of tiles that specific cell moves (don't calculate it for
// 0 values).

// Remember, it must also consider whether the cell merges or not!


Board.tileMovementLeft =

// Once you have completed the Board.tileMovementLeft, you can derive the
// following ones.

Board.tileMovementRight =

Board.tileMovementUp =

Board.tileMovementDown =


export default Object.freeze(Board);