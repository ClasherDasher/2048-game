const boardSize = 5;
let board = Array(boardSize * boardSize).fill(0);
const gameBoardElement = document.getElementById('game-board');

// Initialize board layout
function initBoard() {
    gameBoardElement.innerHTML = '';
    for (let i = 0; i < boardSize * boardSize; i++) {
        const tileElement = document.createElement('div');
        tileElement.classList.add('tile');
        tileElement.dataset.value = 0;
        gameBoardElement.appendChild(tileElement);
    }
    spawnTile();
    spawnTile();
    renderBoard();
}

function spawnTile() {
    const emptyTiles = board.reduce((acc, val, idx) => val === 0 ? acc.concat(idx) : acc, []);
    if (emptyTiles.length > 0) {
        const randomIndex = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[randomIndex] = Math.random() > 0.9 ? 4 : 2;
    }
}

function renderBoard() {
    board.forEach((value, index) => {
        const tile = gameBoardElement.children[index];
        tile.textContent = value === 0 ? '' : value;
        tile.dataset.value = value;
    });
}

function slide(array) {
    let filtered = array.filter(val => val);
    for (let i = 0; i < filtered.length - 1; i++) {
        if (filtered[i] === filtered[i + 1]) {
            filtered[i] *= 2;
            filtered[i + 1] = 0;
        }
    }
    return filtered.filter(val => val).concat(Array(boardSize - filtered.length).fill(0));
}

function moveLeft() {
    for (let i = 0; i < boardSize; i++) {
        const row = board.slice(i * boardSize, (i + 1) * boardSize);
        const newRow = slide(row);
        for (let j = 0; j < boardSize; j++) board[i * boardSize + j] = newRow[j];
    }
    spawnTile();
    renderBoard();
}

function moveRight() {
    for (let i = 0; i < boardSize; i++) {
        const row = board.slice(i * boardSize, (i + 1) * boardSize).reverse();
        const newRow = slide(row).reverse();
        for (let j = 0; j < boardSize; j++) board[i * boardSize + j] = newRow[j];
    }
    spawnTile();
    renderBoard();
}

function moveUp() {
    for (let i = 0; i < boardSize; i++) {
        const column = [];
        for (let j = 0; j < boardSize; j++) column.push(board[j * boardSize + i]);
        const newCol = slide(column);
        for (let j = 0; j < boardSize; j++) board[j * boardSize + i] = newCol[j];
    }
    spawnTile();
    renderBoard();
}

function moveDown() {
    for (let i = 0; i < boardSize; i++) {
        const column = [];
        for (let j = 0; j < boardSize; j++) column.push(board[j * boardSize + i]);
        const newCol = slide(column.reverse()).reverse();
        for (let j = 0; j < boardSize; j++) board[j * boardSize + i] = newCol[j];
    }
    spawnTile();
    renderBoard();
}

// Event listener for both W, A, S, D and Arrow keys
document.addEventListener('keydown', event => {
    if (event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft') moveLeft();
    if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') moveRight();
    if (event.key === 'w' || event.key === 'W' || event.key === 'ArrowUp') moveUp();
    if (event.key === 's' || event.key === 'S' || event.key === 'ArrowDown') moveDown();
});

in
