const selectedMark = document.querySelectorAll('.player-icons input[type="radio"]');
const gameStartButtons = document.querySelectorAll(".game-start__mode");
const startScreen = document.querySelector(".game-start");
const gameScreen = document.querySelector(".game-field");
const backButton = document.querySelector(".back");
const gameBoardCells = document.querySelectorAll(".game-board__cell");
const gameBoardCellIcons = document.querySelectorAll(".game-board__cell-icon");
const turnIndicator = document.querySelectorAll(".icons");
const gameBoard = document.querySelector(".game-board");

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

const menuBtn = document.querySelector(".menu-btn");
const menuOptions = document.querySelector(".menu-options");
const difficultySelectors = document.querySelectorAll(".difficulty-selector");


let playerX = true;
let playerClass = "active-x";
let mode = "cpu";
let currentScreen = startScreen;
let difficulty = "easy";
let isCpuThinking = false;

let playerOne = "X"; // Spieler 1 immer Mensch
let playerTwo = "O"; // Spieler 2 CPU oder Mensch


let xScore = 0;
let oScore = 0;
let tiesCounter = 0;
let winner = false;

let movesX = []
let movesO = []
let closeMenuTimer = null

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

let cpuTactics = [
    {
      name: "easy",
      description: "Random move",
      function: randomMove
    },
    {
      name: "medium",
      description: "Smarter move",
      function: smarterMove
    },
    {
      name: "hard",
      description: "tactical Player",
      function: tacticalPlayer
    }
  ]


  function canCpuWin(ownMoves, opponentMoves) {
    
    const taken = ownMoves.concat(opponentMoves);
  
    for (const combo of winningCombinations) {
      const ownInCombo = combo.filter(i => ownMoves.includes(i));
  
      if (ownInCombo.length === 2) {
        const missing = combo.find(i => !ownMoves.includes(i));
        if (!taken.includes(missing)) {
          return missing;
        }
      }
    }
  
    return null;
  }


  function tacticalPlayer() {
    const allIndexes = [0,1,2,3,4,5,6,7,8];
    const taken = movesX.concat(movesO);
    const available = allIndexes.filter(i => !taken.includes(i));
  
    if (available.length === 0) return;
  
    
    const opponentMoves = playerOne === "X" ? movesX : movesO; // Human
    const ownMoves      = playerTwo === "X" ? movesX : movesO; // CPU
  
    
    const winIndex = canCpuWin(ownMoves, opponentMoves);
    if (winIndex !== null) {
        setTimeout(() => {
          gameBoardCells[winIndex].click();
          isCpuThinking = false;
        }, 750);
        return;
      }
      
  
   
    const blockIndex = checkBlockWin(opponentMoves, ownMoves);
    if (blockIndex !== null) {
        setTimeout(() => {
          gameBoardCells[blockIndex].click();
          isCpuThinking = false;
        }, 750);
        return;
      }
  
    
    const priority = [4, 0, 2, 6, 8, 1, 3, 5, 7];
    const bestIndex = priority.find(i => available.includes(i));
  
    
    const moveIndex = bestIndex ?? available[Math.floor(Math.random() * available.length)];
  
    setTimeout(() => {
        gameBoardCells[moveIndex].click();
        isCpuThinking = false;
      }, 750);
  }

  function checkBlockWin(opponentMoves, ownMoves) {
      
    const taken = opponentMoves.concat(ownMoves);
  
    for (const combo of winningCombinations) {
      
      const oppInCombo = combo.filter(i => opponentMoves.includes(i));
  
      
      if (oppInCombo.length === 2) {
        
        const missing = combo.find(i => !opponentMoves.includes(i));
  
        
        if (!taken.includes(missing)) {
          return missing; 
        }
      }
    }
  
    return null;
  }


function smarterMove() {
  const allIndexes = [0,1,2,3,4,5,6,7,8];
  const taken = movesX.concat(movesO);
  const available = allIndexes.filter(i => !taken.includes(i));

  // Gegner bestimmen: wir blocken den HUMAN (playerOne)
  const opponentMoves = playerOne === "X" ? movesX : movesO;
  const ownMoves      = playerTwo === "X" ? movesX : movesO; // CPU

  const blockIndex = checkBlockWin(opponentMoves, ownMoves);

  if (blockIndex !== null) {
    const cell = gameBoardCells[blockIndex];
    setTimeout(() => {
      cell.click();
      isCpuThinking = false;
    }, 750);
    return;
  }

  if (available.length === 0) return;

  const randomIndex = available[Math.floor(Math.random() * available.length)];
  const cell = gameBoardCells[randomIndex];

  setTimeout(() => {
    cell.click();
    isCpuThinking = false;
  }, 750);
}


function randomMove() {
    const allIndexes = [0,1,2,3,4,5,6,7,8];
    const taken = movesX.concat(movesO);
    const available = allIndexes.filter(index => !taken.includes(index));

    if (available.length === 0) return;

    const randomIndex = available[Math.floor(Math.random() * available.length)];
    const cell = gameBoardCells[randomIndex];

    setTimeout(() => {
        cell.click();
        isCpuThinking = false;
    }, 750);
}


function isHumanTurn() {
    if (playerOne === "X") return playerX;
    return !playerX;
}


function selectGameMode(value) {
  mode = value; // "cpu" oder "pvp"
}



function cpuMove() {
    if (winner) return;
  
    isCpuThinking = true;
  
    const tactic = cpuTactics.find(t => t.name === difficulty) 
                ?? cpuTactics.find(t => t.name === "easy");
  
    tactic?.function();
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

function setTurnIndicator() {
    console.log(playerClass);
    if (playerClass === "active-x") {
      gameBoard.classList.add("is-x-turn");
      gameBoard.classList.remove("is-o-turn");
    } else {
      gameBoard.classList.add("is-o-turn");
      gameBoard.classList.remove("is-x-turn");
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
    gameBoardCells.forEach((cell) => {
        cell.classList.add("is-empty");
    });
    gameBoardCellIcons.forEach((icon) => {
        icon.classList.remove("active-x");
        icon.classList.remove("active-o");
    });
    gameBoardCells.forEach((cell) => {
        cell.classList.remove("active-x");
        cell.classList.remove("active-o");
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


console.log(gameBoardCells);
gameBoardCells.forEach((cell) => {
    cell.addEventListener("click", () => {
        if (winner) return;

        if (mode === "cpu" && isCpuThinking && isHumanTurn()) return;

        const icon = cell.querySelector(".game-board__cell-icon");
        const markTarget = icon || cell;
        if (markTarget.classList.contains("active-x") || markTarget.classList.contains("active-o")) return;

        const index = Number(cell.dataset.cellIndex);

        markTarget.classList.add(playerClass);

        playerMove(index);
        gameBoardMoves++;
        cell.classList.remove("is-empty");

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
        setTurnIndicator();

        if (mode === "cpu" && !winner && !isHumanTurn()) {
            cpuMove();
          }
    });
});



gameStartButtons.forEach((btn) => {
    btn.addEventListener("click", (e) =>{
        selectGameMode(e.target.value);
        setTurnIndicator();
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

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("is-active");
    menuOptions.toggleAttribute("hidden");
});


difficultySelectors.forEach(btn => {
    btn.addEventListener("click", () => {
  
      // Aktiven Style setzen
      difficultySelectors.forEach(b => {
        b.classList.remove("is-active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.setAttribute("aria-pressed", "true");

      difficulty = btn.dataset.difficulty;
      console.log(difficulty);
      btn.classList.add("is-active");
  

      if (closeMenuTimer) {
        clearTimeout(closeMenuTimer);
      }
  
      // Neuen Timer setzen
      closeMenuTimer = setTimeout(() => {
        menuBtn.classList.remove("is-active");
        menuOptions.setAttribute("hidden", true);
        closeMenuTimer = null;
      }, 2000);
  
    });
  });

// Todo
// Punkte Zählen
// Winner Visuell anzeigen
// rematch
// 