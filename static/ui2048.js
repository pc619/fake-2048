import Board from "./board2048.js";
import List from "./list.js";
import F from "./functional.js";
const ui = Object.create(null);

const el = (id) => document.getElementById(id);

const cellList = [];

const boardTable = el("boardTable");

let board = Board.withRandomNewTile(Board.zeroBoard());

ui.init = function () {
    document.body.onkeydown = function (event) {
        const keyActions = {
            "ArrowUp": Board.up,
            "ArrowDown": Board.down,
            "ArrowLeft": Board.left,
            "ArrowRight": Board.right
        };
        const move = keyActions[event.key] || F.identity;
        if (JSON.stringify(board) !== JSON.stringify(move(board))) {
            board = Board.withRandomNewTile(move(board));
            updateUi(board);
        }
    };

    updateUi(board);
};

const scoreSpan = el("score");
const updateUi = function (board) {
    board.forEach(function (row, rowIndex) {
        row.forEach(function (tile, colIndex) {
            const id = rowIndex.toString() + colIndex.toString();
            if (tile === 0) {
                el(id).textContent = "";
            } else {
                el(id).textContent = 2 ** tile;
            }
            el(id).className = "col span-1-of-4 inside color-" + tile;
        });
    });
    scoreSpan.textContent = Board.score(board);
};

export default Object.freeze(ui);