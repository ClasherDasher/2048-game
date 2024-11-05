document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const topScoreDisplay = document.getElementById('top-score');
    const restartButton = document.getElementById('restart');
    let squares = [];
    let score = 0;
    let topScore = 0;

    // Create the game board
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

    // Update cell display
    function updateCell(cell, value) {
        cell.setAttribute('data-value', value);
        cell.innerHTML = value > 0 ? value : '';
        cell.style.backgroundColor = getTileColor(value);
    }

    function getTileColor(value) {
        switch (value) {
            case 2: return '#eee4da';
            case 4: return '#ede0c8';
            case 8: return '#f2b179';
            case 16: return '#f59563';
            case 32: return '#f67c5f';
            case 64: return '#f7603b';
            case 128: return '#f9e79f';
            case 256: return '#f9c74f';
            case 512: return '#90ee90';
            case 1024: return '#43a047';
            case 2048: return '#3e8e41';
            default: return '#ccc0b3';
        }
    }

    // Generate a new tile (2 or 4)
    function generateNewTile() {
        let randomIndex = Math.floor(Math.random() * squares.length);
        while (squares[randomIndex].getAttribute('data-value') != '0') {
            randomIndex = Math.floor(Math.random() * squares.length);
        }
        updateCell(squares[randomIndex], Math.random() < 0.9 ? 2 : 4);
    }

    // Movement functions
    function move(direction) {
        const oldValues = squares.map(cell => cell.getAttribute('data-value'));
        if (direction === 'right') moveRight();
        if (direction === 'left') moveLeft();
        if (direction === 'up') moveUp();
        if (direction === 'down') moveDown();

        if (JSON.stringify(oldValues) !== JSON.stringify(squares.map(cell => cell.getAttribute('data-value')))) {
            generateNewTile();
            updateTopScore();
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

    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let row = [
                    parseInt(squares[i].getAttribute('data-value')),
                    parseInt(squares[i + 1].getAttribute('data-value')),
                    parseInt(squares[i + 2].getAttribute('data-value')),
                    parseInt(squares[i + 3].getAttribute('data-value')),
                ];
                let newRow = slide(row.reverse()).reverse();
                for (let j = 0; j < 4; j++) {
                    updateCell(squares[i + j], newRow[j]);
                }
            }
        }
    }

    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let column = [
                parseInt(squares[i].getAttribute('data-value')),
                parseInt(squares[i + 4].getAttribute('data-value')),
                parseInt(squares[i + 8].getAttribute('data-value')),
                parseInt(squares[i + 12].getAttribute('data-value')),
            ];
            let newColumn = slide(column);
            for (let j = 0; j < 4; j++) {
                updateCell(squares[i + j * 4], newColumn[j]);
            }
        }
    }

    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let column = [
                parseInt(squares[i].getAttribute('data-value')),
                parseInt(squares[i + 4].getAttribute('data-value')),
                parseInt(squares[i + 8].getAttribute('data-value')),
                parseInt(squares[i + 12].getAttribute('data-value')),
            ];
            let newColumn = slide(column.reverse()).reverse();
            for (let j = 0; j < 4; j++) {
                updateCell(squares[i + j * 4], newColumn[j]);
            }
        }
    }

    function slide(array) {
        let filtered = array.filter(num => num);
        let missing = 4 - filtered.length;
        let newArray = Array(missing).fill(0).concat(filtered);

        for (let i = 3; i > 0; i--) {
            if (newArray[i] === newArray[i - 1] && newArray[i] !== 0) {
                newArray[i] *= 2;
                newArray[i - 1] = 0;
                score += newArray[i];
                scoreDisplay.innerHTML = `Score: ${score}`;
            }
        }
        return Array(missing).fill(0).concat(newArray.filter(num => num));
    }

    function updateTopScore() {
        if (score > topScore) {
            topScore = score;
            topScoreDisplay.innerHTML = `Top Score: ${topScore}`;
        }
    }

    function checkForGameOver() {
        let isGameOver = squares.every(square => square.getAttribute('data-value') != '0');
        if (isGameOver) alert('Game Over!');
    }

    function restartGame() {
        score = 0;
        scoreDisplay.innerHTML = `Score: ${score}`;
        createBoard();
    }

    // Prevent WASD keys from scrolling
    document.addEventListener('keydown', (e) => {
        if (["W", "A", "S", "D"].includes(e.key)) {
            e.preventDefault();
        }
    });

    document.addEventListener('keyup', (e) => {
        if (e.key === 'D') move('right');
        if (e.key === 'A') move('left');
        if (e.key === 'W') move('up');
        if (e.key === 'S') move('down');
    });

    restartButton.addEventListener('click', restartGame);

    createBoard();
});
