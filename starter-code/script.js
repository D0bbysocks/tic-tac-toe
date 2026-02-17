const selectedMark = document.querySelectorAll('.player-icons input[type="radio"]');
const gameStartButtons = document.querySelectorAll(".game-start__mode");
const startScreen = document.querySelector(".game-start");
const gameScreen = document.querySelector(".game-field");

let playerX = true;
let mode = "cpu";
let currentScreen = startScreen;

function playerChoice(value) {
    playerX = value === "x";
}

function selectGameMode(e) {
    mode = (e === "cpu") ? "cpu" : "pvp";
}

function showScreen(screenToShow) {
    startScreen.hidden = true;
    gameScreen.hidden = true;

    screenToShow.hidden = false;
    console.log("test");
}






gameStartButtons.forEach((btn) => {
    btn.addEventListener("click", (e) =>{
        selectGameMode(e.target.value);
        console.log(mode);
        showScreen(gameScreen);
    });
});

selectedMark.forEach((input) => {
    input.addEventListener("change", (e) => {
        playerChoice(e.target.value);
    });
});