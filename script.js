let board = [['', '', ''], ['', '', ''], ['', '', '']];
let player1 = '';
let player2 = '';
let currentPlayer = '';
let player1Score = 0;
let player2Score = 0;
let ties = 0;

function startGame() {
    player1 = prompt("Enter Player 1's name:");
    player2 = prompt("Enter Player 2's name:");
    currentPlayer = player1;
}

function updateScoreboard() {
    document.getElementById('player1Score').textContent = player1 + ': ' + player1Score;
    document.getElementById('player2Score').textContent = player2 + ': ' + player2Score;
    document.getElementById('ties').textContent = 'Ties: ' + ties;
}

function makeMove(row, col) {
    if (board[row][col] === '') {
        const symbol = currentPlayer === player1 ? 'X' : 'O';
        board[row][col] = symbol;
        document.getElementById(`r${row}c${col}`).textContent = symbol;

        if (checkWin(symbol)) {
            currentPlayer === player1 ? player1Score++ : player2Score++;
            updateScoreboard();
            alert(currentPlayer + ' wins!');
            resetBoard();
        } else if (checkDraw()) {
            ties++;
            updateScoreboard();
            alert('It\'s a draw!');
            resetBoard();
        } else {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
        }
    }
}

function checkWin(symbol) {
    for (let i = 0; i < 3; i++) {
        if (
            (board[i][0] === symbol && board[i][1] === symbol && board[i][2] === symbol) ||
            (board[0][i] === symbol && board[1][i] === symbol && board[2][i] === symbol)
        ) {
            return true;
        }
    }

    if (
        (board[0][0] === symbol && board[1][1] === symbol && board[2][2] === symbol) ||
        (board[0][2] === symbol && board[1][1] === symbol && board[2][0] === symbol)
    ) {
        return true;
    }

    return false;
}

function checkDraw() {
    for (let row of board) {
        for (let cell of row) {
            if (cell === '') return false;
        }
    }
    return true;
}

function resetBoard() {
    board = [['', '', ''], ['', '', ''], ['', '', '']];
    currentPlayer = player1; 
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            document.getElementById(`r${row}c${col}`).textContent = '';
        }
    }
}

startGame();

