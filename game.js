
create_board = (size) => {
    const board = new Array(size);
    for (let i = 0; i < board.length; i++) {
        board[i] = new Array(size);
    }
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

getInput = () => {
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

checkboard = (board) => {
    // check if win on horizontal 
    const arr1d = [].concat(...board).join(''); // convert to a 1dimension array then to a string
    // console.log(arr1d.join(''));
    let result_horizontal = arr1d.includes('ooo') || arr1d.includes('xxx') ? true : false;

    // check if win on vertical
    const board_transposed = board[0].map((_, colIndex) => board.map(row => row[colIndex]));
    const arr1d_vertical = [].concat(...board_transposed).join(''); // convert to a 1dimension array then to a string
    // console.log(arr1d_vertical.join(''));
    let result_vertical = arr1d_vertical.includes('ooo') || arr1d_vertical.includes('xxx')? true : false;

    // TODO: check if win on diagonal
    const result_diagonal = false

    // if there's one win, it returns true
    if ((result_horizontal * 1 + result_vertical * 1 + result_diagonal * 1) > 0) { return true }
    // return result
}


// ###############################################################

// Initialize game
const SIZE = 3
let isOver = false
let newBoard = create_board(SIZE)

// First print of the board :
display_board(newBoard)

let player = "x"

gameLoop = () => {
    let coords = getInput() // //Ask for the column and row of the next move
    display_board(update_board(newBoard, coords, player))
    isOver = checkboard(newBoard)
    player == "x" ? player = "o" : player = "x"
}

// Game loop 
while (!isOver) { // check if we have reached a winning or end condition. If so, stop the game.
    gameLoop()
}
console.log("end");
player == "x" ? player = "o" : player = "x"
console.log("Winner: ", player);
