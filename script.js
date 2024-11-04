body {
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #faf8ef;
    color: #776e65;
}

h1 {
    font-size: 2em;
    margin: 20px 0;
}

.game-container {
    display: grid;
    grid-template-columns: repeat(5, 80px);
    gap: 10px;
}

.tile {
    width: 80px;
    height: 80px;
    background-color: #cdc1b4;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
    border-radius: 5px;
}
