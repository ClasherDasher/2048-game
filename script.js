document.addEventListener('DOMContentLoaded', () => {
  const gridDisplay = document.querySelector('.grid');
  const scoreDisplay = document.getElementById('score');
  const restartButton = document.getElementById('restart');
  let squares = [];
  let score = 0;

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

  function slide(array) {
    let filtered = array.filter(num => num);
    let missing = 4 - filtered.length;
    let newArray = Array(missing).fill(0).concat(filtered);

    for (let i = 3; i > 0; i--) {
      if (newArray[i] === newArray[i - 1] && newArray[i] !== 0) {
        newArray[i] *= 2;
        newArray[i - 1] = 0;
        score += newArray[i];
        scoreDisplay.innerHTML = score;
      }
    }
    return Array(missing).fill(0).concat(newArray.filter(num => num));
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

  // Prevent arrow keys from scrolling
  document.addEventListener('keydown', (e) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "W", "A", "S", "D"].includes(e.key)) {
      e.preventDefault();
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'D') move('right');
    if (e.key === 'ArrowLeft' || e.key === 'A') move('left');
    if (e.key === 'ArrowUp' || e.key === 'W') move('up');
    if (e.key === 'ArrowDown' || e.key === 'S') move('down');
  });

  restartButton.addEventListener('click', restartGame);

  createBoard();
});
