const selectedMark = document.querySelectorAll('.player-icons input[type="radio"]');
const gameStartButtons = document.querySelectorAll(".game-start__mode");
const startScreen = document.querySelector(".game-start");
const gameScreen = document.querySelector(".game-field");
const backButton = document.querySelector(".back");
const gameBoardCells = document.querySelectorAll(".game-board__cell");
const gameBoardCellIcons = document.querySelectorAll(".game-board__cell-icon");
const turnIndicator = document.querySelectorAll(".icons");

const quitBtn = document.querySelector('[data-action="quit"]');
const nextRoundBtn = document.querySelector('[data-action="next-round"]');
const winningScreen = document.querySelector(".winning-screen");
const backdrop = document.querySelector(".backdrop");
const winningScreenPlayerMark = document.querySelector(".winning-screen__player-mark");
const winningIconX = document.querySelector('.winning-message-icon[data-mark="x"]');
const winningIconO = document.querySelector('.winning-message-icon[data-mark="o"]');

const playerXScoreUI = document.querySelector(".score--player .score__points");
const playerOScoreUI = document.querySelector(".score--opponent .score__points");
const tiesScoreUI = document.querySelector(".score--ties .score__points");


let playerX = true;
let playerClass = "active-x";
let mode = "cpu";
let currentScreen = startScreen;

let playerOne = "X"; // Spieler 1 immer Mensch
let playerTwo = "O"; // Spieler 2 CPU oder Mensch


let xScore = 0;
let oScore = 0;
let tiesCounter = 0;
let winner = false;

let movesX = []
let movesO = []

let gameBoardMoves = 0;

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






function isHumanTurn() {
    if (playerOne === "X") return playerX;
    return !playerX;
}


function selectGameMode(value) {
  mode = value; // "cpu" oder "pvp"
}



function cpuMove() {
    if (winner) return;

    const allIndexes = [0,1,2,3,4,5,6,7,8];
    const taken = movesX.concat(movesO);
    const available = allIndexes.filter(index => !taken.includes(index));

    if (available.length === 0) return;

    const randomIndex = available[Math.floor(Math.random() * available.length)];
    const cell = gameBoardCells[randomIndex];

    setTimeout(() => {
        cell.click();
    }, 750);
}



function checkWin(player) {
    const hasWon = winningCombinations.some((winCell) => {
        return winCell.every((cell) => {
            return player.includes(cell);
        });
    });
    return hasWon;
}

function endRound(result) {
    winner = true;

    if (result === "win") {

        if (playerX) {
            updateScoreboardPoints("x");
        } else {
            updateScoreboardPoints("o");
        }

        setWinner("win");

    } else if (result === "tie") {

        updateScoreboardPoints("tie");
        setWinner("tie");
    }

    winningScreen.hidden = false;
    backdrop.hidden = false;
}



function checkTie() {
    if (gameBoardMoves === 9) return true;
    return false;
}

function setWinner(result) {
    if (result === "tie") {
        winningScreen.querySelector(".winning-screen__tie").removeAttribute("hidden");
        winningScreen.querySelector(".winning-screen__winner").setAttribute("hidden", true);
    } else {
        winningScreen.querySelector(".winning-screen__winner").removeAttribute("hidden");
        winningScreen.querySelector(".winning-screen__tie").setAttribute("hidden", true);
        winningScreen.querySelector(".winning-screen__player-mark").textContent = playerX ? "X" : "O";
        // Show correct icon and hide the other
        if (playerX === true) {
            winningScreen.querySelector('.winning-message-icon[data-mark="x"]').removeAttribute("hidden");
            winningScreen.querySelector('.winning-message-icon[data-mark="o"]').setAttribute("hidden", true);
        } else {
            winningScreen.querySelector('.winning-message-icon[data-mark="x"]').setAttribute("hidden", true);
            winningScreen.querySelector('.winning-message-icon[data-mark="o"]').removeAttribute("hidden");
        }
    }
}


function playerChange() {
    playerX = !playerX;
    playerClass = playerX ? "active-x" : "active-o";
}

function playerMove(index) {   
    if (playerX) {
        movesX.push(index);
    } else {
        movesO.push(index);
    }
}

function playersTurn() {
    turnIndicator.forEach((icon) => {
        let xIcon = icon.querySelector(".icon--x");
        let oIcon = icon.querySelector(".icon--o");
        xIcon.setAttribute("hidden", true);
        oIcon.setAttribute("hidden", true);
        if (playerClass === "active-x") {
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
    playerClass = "active-x";
    playerX = true;
    gameBoardCellIcons.forEach((icon) => {
        icon.classList.remove("active-x");
        icon.classList.remove("active-o");
    });
    movesX = [];
    movesO = [];
    winningScreen.hidden = true;
    backdrop.hidden = true;
    winner = false;
    gameBoardMoves = 0;
    playersTurn()
}

function resetStartScreen() {
    resetGameBoard();
    const checked = document.querySelector('.player-icons input[type="radio"]:checked');
    applyPlayerChoice(checked ? checked.value : "x");
    xScore = 0;
    oScore = 0;
    tiesCounter = 0;
    playerXScoreUI.textContent = xScore;
    playerOScoreUI.textContent = oScore;
    tiesScoreUI.textContent = tiesCounter;
}

function updateScoreboardPoints(type) {

    if (type === "x") {
        xScore++;
        playerXScoreUI.textContent = xScore;
    }

    if (type === "o") {
        oScore++;
        playerOScoreUI.textContent = oScore;
    }

    if (type === "tie") {
        tiesCounter++;
        tiesScoreUI.textContent = tiesCounter;
    }
}



function updateScoreboardLabels() {
    const X = document.querySelector(".score--player .score__text");
    const O = document.querySelector(".score--opponent .score__text");

    if (mode === "cpu" && playerOne === "X" ) {
        X.textContent = "PLAYER";
        O.textContent = "CPU";
    } else if (mode === "cpu" && playerOne === "O") {
        X.textContent = "CPU";
        O.textContent = "PLAYER";
    } else if (mode === "pvp" && playerOne === "X") {
        X.textContent = "PLAYER 1";
        O.textContent = "PLAYER 2";
    } else {
        X.textContent = "PLAYER 2";
        O.textContent = "PLAYER 1";
    }
}


function applyPlayerChoice(value) {
    playerOne = value === "x" ? "X" : "O";
    playerTwo = value === "x" ? "O" : "X";
  
    selectedMark.forEach((input) => {
      input.checked = input.value === value;
    });
  }



gameBoardCells.forEach((cell) => {
    cell.addEventListener("click", () => {
        if (winner) return;

        const icon = cell.querySelector(".game-board__cell-icon");

        if (icon.classList.contains("active-x") || icon.classList.contains("active-o")) return;

        const index = Number(cell.dataset.cellIndex);

        icon.classList.add(playerClass);

        playerMove(index);
        gameBoardMoves++;

        const currentMoves = playerX ? movesX : movesO;

        if (checkWin(currentMoves)) {
            endRound("win");
            return;
        }

        if (checkTie()) {
            endRound("tie");
            return;
        }

        playerChange();
        playersTurn();

        if (mode === "cpu" && !winner && !isHumanTurn()) {
            cpuMove();
          }
    });
});



gameStartButtons.forEach((btn) => {
    btn.addEventListener("click", (e) =>{
        selectGameMode(e.target.value);
        resetGameBoard()
        updateScoreboardLabels()
        showScreen(gameScreen);
        console.log(playerOne);
        if (mode === "cpu" && !winner && !isHumanTurn()) {
            cpuMove();
          }
    });
});

selectedMark.forEach((input) => {
    input.addEventListener("change", (e) => {
        applyPlayerChoice(e.target.value);
    });
});

backButton.addEventListener("click", () => {
    showScreen(startScreen);
    resetStartScreen();
});

quitBtn.addEventListener("click", () => {
    showScreen(startScreen);
    resetStartScreen();
});

nextRoundBtn.addEventListener("click", () => {
    resetGameBoard();
    showScreen(gameScreen);
  
    // falls CPU starten muss (Human ist O)
    if (mode === "cpu" && !winner && !isHumanTurn()) {
      cpuMove();
    }
  });

// Todo
// Punkte Zählen
// Winner Visuell anzeigen
// rematch
// 