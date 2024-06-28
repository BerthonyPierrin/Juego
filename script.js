document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const board = document.getElementById('board');
    const resetButton = document.getElementById('reset');
    const message = document.getElementById('message');
    const modal = document.getElementById('winnerModal');
    const winnerMessage = document.getElementById('winnerMessage');
    const closeBtn = document.getElementsByClassName('close')[0];

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = Array(9).fill('');

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellPlayed = (clickedCell, clickedCellIndex) => {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
    };

    const handlePlayerChange = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    };

    const handleResultValidation = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            winnerMessage.innerHTML = `Jugador ${currentPlayer} ha ganado!`;
            modal.style.display = 'block';
            gameActive = false;
            return;
        }

        const roundDraw = !gameState.includes('');
        if (roundDraw) {
            winnerMessage.innerHTML = 'Nadie ha ganado!';
            modal.style.display = 'block';
            gameActive = false;
            return;
        }

        handlePlayerChange();
    };

    const handleCellClick = (e) => {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    };

    const handleRestartGame = () => {
        gameActive = true;
        currentPlayer = 'X';
        gameState = Array(9).fill('');
        message.innerHTML = '';
        cells.forEach(cell => cell.innerHTML = '');
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', handleRestartGame);

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        handleRestartGame();
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
            handleRestartGame();
        }
    });
});