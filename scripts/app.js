let currentPlayer = "X"
let gameBoard = Array(3).fill().map(() => Array(3).fill(""));

const initializeGame = () => {
  const main = document.querySelector("main");
  const gameGrid = document.createElement("section");
  gameGrid.classList.add("game-grid");
  main.appendChild(gameGrid);

  Array.from({ length: 9 }).forEach((_, id) => {
    const gridItem = document.createElement("div");
    gridItem.className = "game-grid__item";
    gridItem.id = id;
    gridItem.textContent = "";
    gridItem.addEventListener("pointerdown", handleCellClick);
    gameGrid.appendChild(gridItem);
  });
  const player = document.querySelector("#player");
  player.textContent = `Its turn the player: ${currentPlayer}`;
}

const startButton = document.querySelector(".start-btn");
startButton.addEventListener("pointerdown", () =>{
  initializeGame();
  startButton.remove();
})

const isGameBoardFull = () => {
    return !gameBoard.flat().some(cell => cell === '');
}
const checkWin = () => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
  
    return winPatterns.some(pattern => {
      const [a, b, c] = pattern;
      return gameBoard[Math.floor(a / 3)][a % 3] !== '' && 
             gameBoard[Math.floor(a / 3)][a % 3] === gameBoard[Math.floor(b / 3)][b % 3] &&
             gameBoard[Math.floor(b / 3)][b % 3] === gameBoard[Math.floor(c / 3)][c % 3];
    });
  }

  const clearGameBoard = () => {
    for (let i = 0; i < gameBoard.length; i++) {
      for (let j = 0; j < gameBoard[i].length; j++) {
        gameBoard[i][j] = '';
      }
    }
  
    const gridItems = document.querySelectorAll(".game-grid__item");
    gridItems.forEach(gridItem => {
      gridItem.textContent = '';
    });
  };
  
  const handleCellClick = (e) => {
    const selectedCell = e.target;
    if (selectedCell.textContent !== "") {
      alert(`The current cell is selected by player ${selectedCell.textContent}`)
      return;
    }
    selectedCell.textContent = currentPlayer;
    const rowIndex = Math.floor(parseInt(selectedCell.id) / 3);
    gameBoard[rowIndex][parseInt(selectedCell.id) % 3] = currentPlayer;
  
    if (checkWin()){
      alert(`Player ${currentPlayer} won the Game :)`)
      clearGameBoard();
      return;
    }
    else if (isGameBoardFull()) {
      alert("Gameboard is full");
      clearGameBoard();
    }
    switchPlayer();
  };

const switchPlayer = () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    const player = document.querySelector("#player");
    player.textContent = `Its turn the player: ${currentPlayer}`;
}
  
  
  
