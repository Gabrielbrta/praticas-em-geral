
// select elements from the DOM
const squares = document.querySelectorAll('.quadrado');
const p = document.querySelector('p');
const resetButton = document.querySelector('.reset');
const left = document.querySelector('.left');
const right = document.querySelector('.right');

// set initial player
let jogador = 0;
// Vertical, Horizontal, and Diagonal winning sequences
let winnerSequence = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]];

// set initial player sequences
let playerSequence = [];
let firstPlayerSequence = [];
let secondPlayerSequence = [];
let colorSquaresWinner = [];

// funtions player control -------------------
function togglePlayer() {
    jogador = jogador === 0 ? 1 : 0;
    changeBackgroundColor(jogador);
}

function verifyPlayer() {
    if(jogador === 0) {
        return firstPlayerSequence;
    } else {
        return secondPlayerSequence;
    }
}

// funtions game control -------------------
function insertSymbol(array, i) {
    if(array[i].textContent === '') {
        array[i].textContent = jogador === 0 ? 'X' : 'O';
        // Change the color of the square based on the player
        jogador === 0 ? array[i].style.color= 'red' : array[i].style.color = 'blue';
        setSequence(i);
    }else {
        togglePlayer();
    }
}

function changeBackgroundColor(player){
    if(player === 0) {
        right.classList.remove('show');
        left.classList.add('show');
    } else {
        left.classList.remove('show');
        right.classList.add('show');
    }
}
function resetBackgroundColor() {
    left.classList.remove('show');
    right.classList.remove('show');
}

function setSequence(i){
    playerSequence = verifyPlayer();
    playerSequence.push(i);
    colorSquaresWinner.push(i);
    return playerSequence;    
}

// Check if the player has won -----------------
function verifyWinner(playerSequence, winnerSequence) {
    if(playerSequence.length >= 5) {
        for(let i = 0; i < winnerSequence.length; i++) {
            if(winnerSequence[i].every(index => playerSequence.includes(index))) {
                winner();
                return true;
            } else {
                // If the player has not won, check if the game is a draw
                if(playerSequence.length >= 9 && i === winnerSequence.length - 1) {
                    p.textContent = 'Empate!';
                    freezeGame();
                    showButton();
                    endGame();
                }
            }
        }
    }
}

function winner() {
    p.textContent = `O jogador ${jogador == 0 ? "Xis" : "Círculo"} venceu!`;
}

// control game state -------------------------
function showButton() {
    resetButton.classList.remove('disabled');
}

function freezeGame() {
    squares.forEach(square => {
        square.setAttribute('disabled', 'true');
    });
}

function unfreezeGame() {
    squares.forEach(square => {
        square.removeAttribute('disabled');
    });
}

// Initialization function -----------------
function init(squares, i) {
    togglePlayer();
    insertSymbol(squares, i);
    let jogadorVenceu = verifyWinner(setSequence(i), winnerSequence);
    if(jogadorVenceu) {
        freezeGame();
        endGame();
        showButton();
    }
}

function endGame() {
    jogador = 0;
    firstPlayerSequence = [];
    playerSequence = [];
    secondPlayerSequence = [];
    colorSquaresWinner = [];
    return true;
}

// listeners ----------------------------------
if(endGame()) {
    resetButton.addEventListener('click', () => {
        squares.forEach(square => {
            square.textContent = '';
        });
        p.textContent = '';
        resetButton.classList.add('disabled');
        unfreezeGame();
        resetBackgroundColor();
    });
}

if(squares.length > 0) {
    squares.forEach((square, i) => {
        square.addEventListener("click", () => {
            init(squares, i);
        });
    });
}