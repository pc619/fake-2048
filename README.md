# Fake 2048 - mini project

Now that you have finished all the tutorial sheets you are ready to create your first web app!
This project contains the following features that your final web app must also contain: 
- An appropriate file structure with the static folder being served by the server.
- A server on port 8080 (currently very simple without sessions or cookies - but you don't need to worry about this yet!)
- Appropriately written test files.

The index.html and style.css files have already been created for you, as well as the ui2048.js file which is file that handles user input.
Your task in this project will be to create the functional aspect of the game by following the instructions below. The mandatory tasks only edit the board2048.js file.

## Mandatory tasks

Attempt each of these in a functional style.
Each function should be pure unless otherwise specified - the output of a function is determined solely by it's input, functions only produce output and have no other effect (i.e. don't change the values of parameters or external variables).

* Write a function, *Board.left*, that takes a board and applies a left movement to it, from this, derive *Board.right, Board.up, and Board.down* functions.
* Write a function, *Board.score(board)*, that takes a board and returns the score of the board, i.e. the sum of two to the power of each of the non-zero tile values.
* Write a function, *Board.hasLegalMoves(board)*, that takes a board and returns *true* or *false* depending if there are legal moves you can make.
* Write a function, *Board.freeTiles(board)*, that takes a board and returns how many free/empty tiles it has.
* Write a function, *Board.withNewTile(board, freeTile, value)*, that takes a board, a number that identifies a free tile, and a new value. Return a copy of original board with the square identified with freeTile filled with the new value.
* With the above, *Board.withNewTile(board, Math.floor(Math.random() * Board.freeTiles(board)), Math.floor(1 + Math.random() * 2))* should randomly add a new tile to the board. This is not a pure function, as it uses Math.random.

## Optional tasks - to create animations

If you want to take your Fake 2048 game to the next level, you will need to complete the following challenges. You will also need to do some research on how to create the animations (my tip is to create animations for either 1, 2 or 3 up, down, left, or right movements on CSS and assign them to classes, then in the ui2048.js file, you can add these classes to the specific tiles).

* Write a function *Board.leftAnimation(board)*, which returns a new board where each tile has a value of how many places the tile in that space on the input board would move to the left under a left operation then derive the right, up, and down movements too. This can be used for animation later on.