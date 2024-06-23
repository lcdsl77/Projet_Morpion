document.addEventListener("DOMContentLoaded", () => {
    const playerForm = document.getElementById('playerForm');
    const instructionsSection = document.querySelector('.instructions');
    const gameSection = document.querySelector('.game');
    const board = document.getElementById('board');
    const cells = Array.from(document.querySelectorAll('.cell'));
    const messageDiv = document.getElementById('message');
    const restartButton = document.getElementById('restartButton');
    
    let currentPlayer = 'X';
    let boardState = Array(9).fill(null);
    let isGameActive = true;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    playerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        playerForm.style.display = 'none';
        instructionsSection.style.display = 'block';
        gameSection.style.display = 'block';
    });

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    restartButton.addEventListener('click', restartGame);

    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = cell.getAttribute('data-index');

        if (boardState[cellIndex] !== null || !isGameActive) {
            return;
        }

        cell.innerText = currentPlayer;
        boardState[cellIndex] = currentPlayer;

        if (checkWin(currentPlayer)) {
            messageDiv.innerText = `Le joueur ${currentPlayer} a gagné!`;
            isGameActive = false;
        } else if (boardState.every(cell => cell !== null)) {
            messageDiv.innerText = "Match nul!";
            isGameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWin(player) {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return boardState[index] === player;
            });
        });
    }

    function restartGame() {
        currentPlayer = 'X';
        boardState = Array(9).fill(null);
        cells.forEach(cell => cell.innerText = '');
        messageDiv.innerText = '';
        isGameActive = true;
    }
});
