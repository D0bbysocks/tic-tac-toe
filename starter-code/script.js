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

const playerOneScore = document.querySelector(".score--player .score__points");
const playerTwoScore = document.querySelector(".score--opponent .score__points");
const tiesScore = document.querySelector(".score--ties .score__points");


let playerX = true;
let playerClass = "active-x";
let mode = "cpu";
let currentScreen = startScreen;

let playerOne = "X"; // Spieler 1 immer Mensch
let playerTwo = "O"; // Spieler 2 CPU oder Mensch


let playerXScore = 0;
let playerOScore = 0;
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


function selectGameMode(e) {
    mode = (e === "cpu") ? "cpu" : "pvp";
    // playersTurn();
}



function cpuMove() {
    console.log("CPU Move");
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
            playerXScore++;
            playerOneScore.textContent = playerXScore;
        } else {
            playerOScore++;
            playerTwoScore.textContent = playerOScore;
        }

        setWinner("win");

    } else if (result === "tie") {
            tiesCounter++;
            tiesScore.textContent = tiesCounter;
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
    applyPlayerChoice("x")

}

function updateScoreboardLabels() {
    const playerLabel = document.querySelector(".score--player .score__text");
    const opponentLabel = document.querySelector(".score--opponent .score__text");

    if (mode === "cpu") {
        playerLabel.textContent = "PLAYER";
        opponentLabel.textContent = "CPU";
    } else {
        playerLabel.textContent = "PLAYER 1";
        opponentLabel.textContent = "PLAYER 2";
    }
}


function applyPlayerChoice(value) {
    playerOne = value === "x" ? "X" : "O";
    playerTwo = value === "x" ? "O" : "X";
  
    selectedMark.forEach((input) => {
      input.checked = input.value === value;
    });
  }


backButton.addEventListener("click", () => {
    showScreen(startScreen);
});


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
    });
});



gameStartButtons.forEach((btn) => {
    btn.addEventListener("click", (e) =>{
        selectGameMode(e.target.value);
        resetGameBoard()
        updateScoreboardLabels()
        showScreen(gameScreen);
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

quitBtn.addEventListener("click", () => {
    showScreen(startScreen);
    resetGameBoard();
});

nextRoundBtn.addEventListener("click", () => {
    resetGameBoard();
    showScreen(gameScreen);
});

// Todo
// Punkte Zählen
// Winner Visuell anzeigen
// rematch
// 