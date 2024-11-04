const boardSize = 5;
const board = [];
const gameBoardElement = document.getElementById('game-board');

function initBoard() {
    for (let i = 0; i < boardSize * boardSize; i++) {
        board.push(0);
        const tileElement = document.createElement('div');
        tileElement.classList.add('tile');
        gameBoardElement.appendChild(tileElement);
    }
    spawnTile();
    spawnTile();
    renderBoard();
}

function spawnTile() {
    let emptyTiles = board.reduce((acc, val, idx) => (val === 0 ? acc.concat(idx) : acc), []);
    if (emptyTiles.length > 0) {
        let randomIndex = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[randomIndex] = Math.random() > 0.9 ? 4 : 2;
    }
}

function renderBoard() {
    gameBoardElement.childNodes.forEach((tile, index) => {
        tile.textContent = board[index] !== 0 ? board[index] : '';
        tile.style.backgroundColor = board[index] !== 0 ? '#f2b179' : '#cdc1b4';
    });
}

function moveLeft() {
    for (let i = 0; i < boardSize; i++) {
        let row = board.slice(i * boardSize, (i + 1) * boardSize);
        row = row.filter(val => val);
        while (row.length < boardSize) row.push(0);
        for (let j = 0; j < boardSize; j++) board[i * boardSize + j] = row[j];
    }
    spawnTile();
    renderBoard();
}

function moveRight() {
    for (let i = 0; i < boardSize; i++) {
        let row = board.slice(i * boardSize, (i + 1) * boardSize).reverse();
        row = row.filter(val => val);
        while (row.length < boardSize) row.push(0);
        row.reverse();
        for (let j = 0; j < boardSize; j++) board[i * boardSize + j] = row[j];
    }
    spawnTile();
    renderBoard();
}

function moveUp() {
    for (let i = 0; i < boardSize; i++) {
        let column = [];
        for (let j = 0; j < boardSize; j++) column.push(board[j * boardSize + i]);
        column = column.filter(val => val);
        while (column.length < boardSize) column.push(0);
        for (let j = 0; j < boardSize; j++) board[j * boardSize + i] = column[j];
    }
    spawnTile();
    renderBoard();
}

function moveDown() {
    for (let i = 0; i < boardSize; i++) {
        let column = [];
        for (let j = 0; j < boardSize; j++) column.push(board[j * boardSize + i]);
        column.reverse();
        column = column.filter(val => val);
        while (column.length < boardSize) column.push(0);
        column.reverse();
        for (let j = 0; j < boardSize; j++) board[j * boardSize + i] = column[j];
    }
    spawnTile();
    renderBoard();
}

document.addEventListener('keydown', event => {
    if (event.key === 'a' || event.key === 'A') moveLeft();
    if (event.key === 'd' || event.key === 'D') moveRight();
    if (event.key === 'w' || event.key === 'W') moveUp();
    if (event.key === 's' || event.key === 'S') moveDown();
});

init
