const selectedMark = document.querySelectorAll('.player-icons input[type="radio"]');
const gameStartButtons = document.querySelectorAll(".game-start__mode");
const startScreen = document.querySelector(".game-start");
const gameScreen = document.querySelector(".game-field");
const backButton = document.querySelector(".back");
const gameBoardCells = document.querySelectorAll(".game-board__cell");
const gameBoardCellIcons = document.querySelectorAll(".game-board__cell-icon");
const turnIndicator = document.querySelectorAll(".icons");



let playerX = true;
let playerClass = "active-x";
let mode = "cpu";
let currentScreen = startScreen;

let gameBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

let playerXScore = 0;
let playerOScore = 0;
let tiesScore = 0;

let movesX = []
let movesO = []

let winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];



function playerChoice(value) {
    playerX = value === "x";
    playerClass = playerX ? "active-x" : "active-o";
}

function selectGameMode(e) {
    mode = (e === "cpu") ? cpuGameMode() : pvpGameMode();
    playersTurn();
}


function cpuGameMode() {

    return "cpu";
}

function pvpGameMode() {

    return "pvp";
}

function checkWin(player) {
    const hasWon = winningCombinations.some((winCell) => {
        return winCell.every((cell) => {
            return player.includes(cell);
        });
    });

    if (hasWon) {
        console.log("Winner");
    }
}

function playerChange() {
    playerX = !playerX;
    playerClass = playerX ? "active-x" : "active-o";
}

function playerMove(index) {
    if (playerX) {
        movesX.push(index);
        console.log(movesX);
        checkWin(movesX);

    } else {
        movesO.push(index);
        console.log(movesO);
        checkWin(movesO);
    }
}

function playersTurn() {
    turnIndicator.forEach((icon) => {
        let xIcon = icon.querySelector(".icon--x");
        let oIcon = icon.querySelector(".icon--o");
        xIcon.setAttribute("hidden", true);
        oIcon.setAttribute("hidden", true);
        if (playerClass !== "active-x") {
            xIcon.removeAttribute("hidden");
        } else {
            oIcon.removeAttribute("hidden");
        }
    });
    
}

function showScreen(screenToShow) {
    startScreen.hidden = true;
    gameScreen.hidden = true;

    screenToShow.hidden = false;
}

function resetGameBoard() {
    gameBoardCellIcons.forEach((icon) => {
        icon.classList.remove("active-x");
        icon.classList.remove("active-o");
    });
    movesX = [];
    movesO = [];
}


backButton.addEventListener("click", () => {
    showScreen(startScreen);
});


gameBoardCells.forEach((cell) => {
    cell.addEventListener("click", () => {
      const icon = cell.querySelector(".game-board__cell-icon");
  

      if (icon.classList.contains("active-x") || icon.classList.contains("active-o")) return;
  
      const index = Number(cell.dataset.cellIndex);
  
      icon.classList.add(playerClass);
  
      playerMove(index);
      playerChange();
      playersTurn();
    });
  });


gameStartButtons.forEach((btn) => {
    btn.addEventListener("click", (e) =>{
        selectGameMode(e.target.value);
        resetGameBoard()
        showScreen(gameScreen);
    });
});

selectedMark.forEach((input) => {
    input.addEventListener("change", (e) => {
        playerChoice(e.target.value);
    });
});


// Todo
// Punkte Zählen
// Winner Visuell anzeigen
// rematch
// 