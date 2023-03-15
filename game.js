
create_board = (size) => {
    const board = new Array(size);
    for (let i = 0; i < board.length; i++) {
        board[i] = new Array(size);
    }
    // Fill board with empty spaces
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

getInput = (size) => {
    let prompt = require('prompt-sync')({
        sigint: true // you can kill the wait with ctrl-C
    });
    console.log("Your next move:")
    let column_input = 0
    let column = 0
    let row_input = 0
    let row = 0
    do {
        column_input = prompt(`Enter the column number:`);
        column = parseInt(column_input) - 1;   // the input is a string, we cast it to integer 
        row_input = prompt(`Enter the row number:`);
        row = parseInt(row_input) - 1;   //the input is a string, we cast it to integer
    } while (!(column <= size && column >= 0 && row <= size && row >= 0))
    return { column, row };
}

checkboard = (board) => { // TODO: refactor this !
    // check if win on horizontal 
    const arr1d = [].concat(...board).join(''); // convert to a 1dimension array then to a string
    let result_horizontal1 = arr1d.slice(0,3).includes('ooo') || arr1d.slice(0,3).includes('xxx') ? true : false;
    let result_horizontal2 = arr1d.slice(3,6).includes('ooo') || arr1d.slice(3,6).includes('xxx') ? true : false;
    let result_horizontal3 = arr1d.slice(6).includes('ooo') || arr1d.slice(6).includes('xxx') ? true : false;

    // check if win on vertical
    const board_transposed = board[0].map((_, colIndex) => board.map(row => row[colIndex]));
    const arr1d_vertical = [].concat(...board_transposed).join(''); // convert to a 1dimension array then to a string
    let result_vertical1 = arr1d_vertical.slice(0,3).includes('ooo') || arr1d_vertical.slice(0,3).includes('xxx') ? true : false;
    let result_vertical2 = arr1d_vertical.slice(3,6).includes('ooo') || arr1d_vertical.slice(3,6).includes('xxx') ? true : false;
    let result_vertical3 = arr1d_vertical.slice(6).includes('ooo') || arr1d_vertical.slice(6).includes('xxx') ? true : false;

    // check if win on diagonal
    let result_diagonal1 = ((board[0][0] === "x" ) && (board[1][1] === "x") && (board[2][2] === "x")) ? 1 : 0
    let result_diagonal2 = ((board[0][0] === "o" ) && (board[1][1] === "o") && (board[2][2] === "o")) ? 1 : 0
    let result_diagonal3 = ((board[2][0] === "x" ) && (board[1][1] === "x") && (board[0][2] === "x")) ? 1 : 0
    let result_diagonal4 = ((board[2][0] === "o" ) && (board[1][1] === "o") && (board[0][2] === "o")) ? 1 : 0
    let result_diagonal = result_diagonal1 + result_diagonal2 + result_diagonal3 + result_diagonal4
    
    // if there's one win, it returns 1 :
    let result_total = result_horizontal1 * 1 + result_horizontal2 * 1 + result_horizontal3 * 1 + result_vertical1 * 1 + result_vertical2 * 1 + result_vertical3 * 1 + result_diagonal
    let result = (result_total > 0) ? true : false
    return result
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
    let coords = getInput(SIZE) // //Ask for the column and row of the next move
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
