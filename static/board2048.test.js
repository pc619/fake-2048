import Board from "./board2048.js";
import F from "./functional.js";
import List from "./list.js";

const describe = window.describe;
const it = window.it;
const fc = window.fastcheck;
const chai = window.chai;

const arbTile = fc.nat(16);
const arbRow = fc.tuple(arbTile, arbTile, arbTile, arbTile);
const arbBoardFromConstruction = fc.tuple(arbRow, arbRow, arbRow, arbRow);

const arbMove = fc.constantFrom(
    Board.left,
    Board.right,
    Board.up,
    Board.down
);

const zeroBoard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

const arbBoardFromMoves = fc.array(arbMove, 512).map(
    (moves) => moves.reduce(
        (board, move) => Board.withRandomNewTile(move(board)),
        zeroBoard
    )
);

const arbBoard = fc.oneof(arbBoardFromMoves, arbBoardFromConstruction);

console.log(
    fc.sample(arbBoardFromMoves, 10)
);

describe("Example Based Testing", function () {
    it("Left operation work as expected", function () {
        const start = [
            [1, 1, 2, 2],
            [1, 0, 0, 1],
            [0, 0, 1, 1],
            [0, 2, 2, 3]
        ];
        const left = Board.left(start);
        const expected = [
            [2, 3, 0, 0],
            [2, 0, 0, 0],
            [2, 0, 0, 0],
            [3, 3, 0, 0]
        ];
        if (!Board.equals(left, expected)) {
            throw "Left operation didn't work as expected";
        }

        chai.expect(Board.left([
            [1, 2, 3, 4],
            [1, 2, 3, 4],
            [1, 2, 3, 4],
            [1, 2, 3, 4]
        ])).to.deep.equal([
            [1, 2, 3, 4],
            [1, 2, 3, 4],
            [1, 2, 3, 4],
            [1, 2, 3, 4]
        ]);

        chai.expect(Board.left([
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ])).to.deep.equal([
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]);

    });

    it("Right moves perform as expected", function () {
        const start = [
            [1, 1, 2, 2],
            [1, 0, 0, 1],
            [0, 0, 1, 1],
            [0, 2, 2, 3]
        ];
        const right = Board.right(start);
        const expected = [
            [0, 0, 2, 3],
            [0, 0, 0, 2],
            [0, 0, 0, 2],
            [0, 0, 3, 3]
        ];

        chai.expect(right).to.deep.equal(expected);
    });

});

describe("Game moves", function () {
    it(
        "Given a board; " +
        "After performing a move operation; " +
        "Scores the same as before the operation.",
        function () {

            fc.assert(fc.property(
                arbBoard,
                arbMove,

                function (board, move) {
                    return Board.score(board) === Board.score(move(board));
                }

            ));
        }
    );
});