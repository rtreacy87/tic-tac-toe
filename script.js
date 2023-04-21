let board = [['', '', ''], ['', '', ''], ['', '', '']];
let currentPlayer = '';
let player1Score = 0;
let player2Score = 0;
let ties = 0;
let gameOver = false;
let player1 = {
    name: ''
};

let player2 = {
    name: ''
};



function startGame() {
    document.getElementById('submitNames').addEventListener('click', function() {
        player1.name = document.getElementById('player1Name').value || 'Player 1';
        player2.name = document.getElementById('player2Name').value || 'Player 2';
    
        updateScoreboard();
    
        // Hide the name form
        document.getElementById('nameForm').style.display = 'none';
    
        // Show the game board
        document.getElementById('game').style.display = 'flex';
    });
}

function updateScoreboard() {
    document.getElementById('player1Score').textContent = player1.name + ': ' + player1Score;
    document.getElementById('player2Score').textContent = player2.name + ': ' + player2Score;
    document.getElementById('ties').textContent = 'Ties: ' + ties;
}

function makeMove(row, col) {
    if (gameOver) return;
    if (board[row][col] === '') {
        const symbol = currentPlayer === player1 ? 'X' : 'O';
        board[row][col] = symbol;
        document.getElementById('game').children[row].children[col].textContent = symbol;

        if (checkWin(symbol)) {
            currentPlayer === player1 ? player1Score++ : player2Score++;
            message.textContent = currentPlayer.name + ' wins!';
            message.style.display = 'block'; // Make the message visible
            updateScoreboard();
            document.getElementById('message').textContent = currentPlayer.name + ' wins!';
            document.getElementById('myButton').style.display = 'block'; // Show the reset button
        } else if (checkDraw()) {
            ties++;
            updateScoreboard();
            document.getElementById('message').textContent = 'It\'s a draw!';
            document.getElementById('myButton').style.display = 'block'; // Show the reset button
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
            gameOver = true;
            return true;
        }
    }

    if (
        (board[0][0] === symbol && board[1][1] === symbol && board[2][2] === symbol) ||
        (board[0][2] === symbol && board[1][1] === symbol && board[2][0] === symbol)
    ) {
        gameOver = true;
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
    gameOver = true;
    message.textContent = "It's a draw!";
    message.style.display = 'block'; // Make the message visible
    return true;
}

function resetBoard() {
    board = [['', '', ''], ['', '', ''], ['', '', '']];
    currentPlayer = player1;
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            document.getElementById('game').children[row].children[col].textContent = '';
        }
    }
    gameOver = false;
    document.getElementById('myButton').style.display = 'none'; // Hide the reset button
    message.textContent = ''; // Clear the message
    message.style.display = 'none'; // Hide the message window
}

function showButton() {
    document.getElementById("myButton").style.display = "block";
}


startGame();
currentPlayer = player1;
