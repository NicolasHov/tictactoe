
create_board = (size) => {
    const board = new Array(size);
    for (let i = 0; i < board.length; i++) {
        board[i] = new Array(size);
    }
    return board
}

set_empty_board = (board) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j] = " "
        }
    }
    return board
}

display_board = (board) => {
    let result = ""
    for (let i = 0; i < board.length; i++) { result += " -" }
    result += "\n"
    for (let i = 0; i < board.length; i++) {
        result += "|";
        for (let j = 0; j < board[i].length; j++) {
            result += board[i][j] + "|";
        }
        result += "\n"
        for (let i = 0; i < board.length; i++) { result += " -" }
        result += "\n"
    }
    console.log(result);
}


update_board = (board, coords, player) => {
    board[coords.row][coords.column] != " " ? null : board[coords.row][coords.column] = player
    return board
}


function getInput() {
    let prompt = require('prompt-sync')({
        sigint: true // you can kill the wait with ctrl-C
    });
    console.log("Your next move:");
    let column_input = prompt(`Enter the column number:`);
    let column = parseInt(column_input) - 1;   // the input is a string, we cast it to integer 
    let row_input = prompt(`Enter the row number:`);
    let row = parseInt(row_input) - 1;   //the input is a string, we cast it to integer 
    return { column, row };
}

checkIfWin = (board) => {
    // TODO: check if win on horizontal or vertical or diagonal
}


// ###############################################################

// Initialize game
const SIZE = 3
let isPlaying = true
let newBoard = set_empty_board(create_board(SIZE))

// First print of the board :
display_board(newBoard)

let player = "x"

function gameLoop() {
    //Ask for the column in which to put the piece
    let coords = getInput()
    display_board(update_board(newBoard, coords, player))
    player == "x" ? "o" : "x"
    isGameOver = checkIfWin(newBoard)
}

// Game loop 
while (isPlaying) { // check if we have reached a winning or end condition. If so, stop the game.
    gameLoop()
}
console.log("end");