document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const restartButton = document.getElementById('restart');
    let squares = [];
    let score = 0;

    function createBoard() {
        gridDisplay.innerHTML = '';
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
        cell.innerHTML = value > 0 ? value : '';
    }

    function generateNewTile() {
        let randomIndex = Math.floor(Math.random() * squares.length);
        while (squares[randomIndex].getAttribute('data-value') != '0') {
            randomIndex = Math.floor(Math.random() * squares.length);
        }
        updateCell(squares[randomIndex], Math.random() < 0.9 ? 2 : 4);
    }

    function move(direction) {
        const oldValues = squares.map(cell => cell.getAttribute('data-value'));
        if (direction === 'right') moveRight();
        if (direction === 'left') moveLeft();
        if (direction === 'up') moveUp();
        if (direction === 'down') moveDown();

        if (JSON.stringify(oldValues) !== JSON.stringify(squares.map(cell => cell.getAttribute('data-value')))) {
            generateNewTile();
        }
        checkForGameOver();
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
                let newRow = slide(row);
                for (let j = 0; j < 4; j++) {
                    updateCell(squares[i + j], newRow[j]);
                }
            }
        }
    }

    function slide(row) {
        let filteredRow = row.filter(num => num);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        filteredRow = zeros.concat(filteredRow);

        for (let i = 3; i > 0; i--) {
            if (filteredRow[i] === filteredRow[i - 1] && filteredRow[i] !== 0) {
                filteredRow[i] *= 2;
                filteredRow[i - 1] = 0;
                score += filteredRow[i];
                scoreDisplay.innerHTML = score;
            }
        }
        return zeros.concat(filteredRow.filter(num => num));
    }

    function checkForGameOver() {
        let isGameOver = squares.every(square => square.getAttribute('data-value') != '0');
        if (isGameOver) alert('Game Over!');
    }

    function restartGame() {
        score = 0;
        scoreDisplay.innerHTML = score;
        createBoard();
    }

    document.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowRight') move('right');
        if (e.key === 'ArrowLeft') move('left');
        if (e.key === 'ArrowUp') move('up');
        if (e.key === 'ArrowDown') move('down');
    });
    restartButton.addEventListener('click', restartGame);

    createBoard();
});
