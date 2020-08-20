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

const combineReducer = function (acc, arg) {
    if (arg === acc.hold) {
        return {"hold": 0, "array": acc.array.concat(arg + 1)};
    }
    return {"hold": arg, "array": acc.array.concat(acc.hold)};
};

const combine = function (row) {
    const initial = {"hold": 0, "array": []};
    const reduced = row.reduce(combineReducer, initial);
    return condense(reduced.array.concat(reduced.hold));
};

const pad = (row) => [0, 0, 0, 0].map((ignore, i) => row[i] || 0);

const rowLeft = compose(pad, combine, condense);

const flipH = map(List.reverse);
const flipV = compose(List.transpose, flipH, List.transpose);

Board.left = map(rowLeft);
Board.right = compose(flipH, Board.left, flipH);
Board.up = compose(List.transpose, Board.left, List.transpose);
Board.down = compose(flipV, Board.up, flipV);

Board.left.toString = () => "Left";
Board.right.toString = () => "Right";
Board.up.toString = () => "Up";
Board.down.toString = () => "Down";

// Board.score = function (board) {
//     let total = 0;

//     board.forEach(function (row) {
//         row.forEach(function (tile) {
//             if (tile !== 0) {
//                 total += 2 ** tile;
//             }
//         });
//     });

//     return total;
// };

const flatten = (board) => board.flat();
const powerOfTwo = (x) => 2 ** x;
const plus = (a, x) => a + x;
const sum = (list) => list.reduce(plus, 0);

Board.score = pipe(
    flatten,
    condense,
    map(powerOfTwo),
    sum
);

Board.equals = (board1, board2) => board1.every(
    (row1, i) => row1.every((tile, j) => tile === board2[i][j])
);

const isNoOp = (move) => (board) => Board.equals(move(board), board);

Board.hasLegalMoves = (board) => moveList.map(isNoOp).some(
    (noOpTests) => !noOpTests(board)
);

const unflatten = function (flatboard, returnArray = []) {
    if (flatboard.length > 4) {
        const [a, b, c, d, ...rest] = flatboard;
        return unflatten(rest, returnArray.concat([[a, b, c, d]]));
    }
    return returnArray.concat([flatboard]);
};

const freeTilesRow = (row) => row.filter((tile) => tile === 0).length;

Board.freeTiles = pipe(
    map(freeTilesRow),
    sum
);

Board.withNewTile = function (board, freeTileN, value) {
    const freeTiles = Board.freeTiles(board);
    const reducer = (a, x) => (
        x === 0
        ? (
            a.count === freeTileN % freeTiles
            ? {"count": a.count + 1, "array": a.array.concat(value)}
            : {"count": a.count + 1, "array": a.array.concat(0)}
        )
        : {"count": a.count, "array": a.array.concat(x)}
    );

    const flatBoard = board.flat();
    const initialValue = {"count": 0, "array": []};
    const modified = flatBoard.reduce(reducer, initialValue).array;
    return unflatten(modified);
};

// /**
//  * returns a new board which is a copy of board,
//  * with the free tile indicated replaced with value.
//  *
//  * This function is implemented in quite an imperative way.
//  */
// Board.withNewTile = function (board, freeTile, value) {
//     // first identify the row to edit.
//     let rowIndex;
//     board.forEach(function (row, i) {
//         if (rowIndex !== undefined) {
//             return;
//         }
//         const freeTilesInRow = freeTilesRow(row);
//         if (freeTile < freeTilesInRow) {
//             rowIndex = i;
//         } else {
//             freeTile -= freeTilesInRow;
//         }
//     });

//     //clone row, and edit marked element.
//     const newRow = board[rowIndex].slice();
//     newRow.forEach(function (tile, i) {
//         if (tile === 0) {
//             if (freeTile === 0) {
//                 newRow[i] = value;
//             }
//             freeTile -= 1;
//         }
//     });

//     // clone original board, insert new row and return;
//     const newBoard = board.slice();
//     newBoard[rowIndex] = newRow;
//     return newBoard;
// };

Board.withRandomNewTile = function (board) {
    const freeTiles = Board.freeTiles(board);
    if (freeTiles === 0) {
        return board;
    }
    return Board.withNewTile(
        board,
        Math.floor(Math.random() * freeTiles),
        Math.floor(1 + Math.random() * 2)
    );
};

const start = [
    [1, 1, 2, 2],
    [1, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 2, 2, 3]
];

console.log(
    start,
    Board.score(start)
);

export default Object.freeze(Board);