document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const restartButton = document.getElementById('restart');
    let squares = [];
    let score = 0;

    function createBoard() {
        gridDisplay.innerHTML = '';  // Clear existing cells
        squares = [];
        for (let i = 0; i < 16; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-value', '0');
            gridDisplay.appendChild(cell);
            squares.push(cell);
        }
        generateNewTile();
        generateNewTile();
    }

    function updateCell(cell, value) {
        cell.setAttribute('data-value', value);
        cell.innerHTML = value > 0 ? value : '';  // Only show non-zero values
        cell.classList.remove('merge');
        if (value > 0) cell.classList.add('merge');
    }

    function generateNewTile() {
        let randomIndex = Math.floor(Math.random() * squares.length);
        while (squares[randomIndex].getAttribute('data-value') != '0') {
            randomIndex = Math.floor(Math.random() * squares.length);
        }
        updateCell(squares[randomIndex], Math.random() < 0.9 ? 2 : 4);
    }

    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let row = [
                    parseInt(squares[i].getAttribute('data-value')),
                    parseInt(squares[i + 1].getAttribute('data-value')),
                    parseInt(squares[i + 2].getAttribute('data-value')),
                    parseInt(squares[i + 3].getAttribute('data-value')),
                ];
                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = zeros.concat(filteredRow);

                for (let j = 0; j < 4; j++) {
                    updateCell(squares[i + j], newRow[j]);
                }
            }
        }
    }

    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].getAttribute('data-value') === squares[i + 1].getAttribute('data-value') && squares[i].getAttribute('data-value') != '0') {
                let combinedTotal = parseInt(squares[i].getAttribute('data-value')) * 2;
                updateCell(squares[i], combinedTotal);
                updateCell(squares[i + 1], 0);
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
    }

    function control(e) {
        if (e.keyCode === 39) moveRight();
        combineRow();
        generateNewTile();
        checkForGameOver();
    }

    function checkForGameOver() {
        let isGameOver = true;
        squares.forEach(square => {
            if (square.getAttribute('data-value') == '0') isGameOver = false;
        });
        if (isGameOver) alert('Game Over!');
    }

    function restartGame() {
        score = 0;
        scoreDisplay.innerHTML = score;
        createBoard();
    }

    document.addEventListener('keyup', control);
    restartButton.addEventListener('click', restartGame);

    createBoard();
});
