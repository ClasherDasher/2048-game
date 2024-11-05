document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    let squares = [];
    let score = 0;

    // Create the game board
    function createBoard() {
        for (let i = 0; i < 16; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.innerHTML = 0;
            gridDisplay.appendChild(cell);
            squares.push(cell);
        }
        generateNewTile();
        generateNewTile();
    }

    // Generate a new tile (2 or 4)
    function generateNewTile() {
        let randomIndex = Math.floor(Math.random() * squares.length);
        while (squares[randomIndex].innerHTML != 0) {
            randomIndex = Math.floor(Math.random() * squares.length);
        }
        squares[randomIndex].innerHTML = Math.random() < 0.9 ? 2 : 4;
    }

    // Move tiles
    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let row = [
                    parseInt(squares[i].innerHTML),
                    parseInt(squares[i + 1].innerHTML),
                    parseInt(squares[i + 2].innerHTML),
                    parseInt(squares[i + 3].innerHTML),
                ];
                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = zeros.concat(filteredRow);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }

    // Combine row
    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML && squares[i].innerHTML != 0) {
                let combinedTotal = parseInt(squares[i].innerHTML) * 2;
                squares[i].innerHTML = combinedTotal;
                squares[i + 1].innerHTML = 0;
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
    }

    // Control functions
    function control(e) {
        if (e.keyCode === 39) moveRight();
        combineRow();
        generateNewTile();
        checkForGameOver();
    }
    
    // Check for Game Over
    function checkForGameOver() {
        let isGameOver = true;
        squares.forEach(square => {
            if (square.innerHTML == 0) isGameOver = false;
        });
        if (isGameOver) alert('Game Over!');
    }

    document.addEventListener('keyup', control);
    createBoard();
});
