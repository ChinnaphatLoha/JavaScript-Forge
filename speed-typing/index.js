const wordElement = document.getElementById("word");
const textElement = document.getElementById("text");
const scoreElement = document.getElementById("score");
const durationElement = document.getElementById("duration");

const btnLevelElement = document.getElementById("level-btn");
const settingsElement = document.getElementById("settings");
const levelFormElement = document.getElementById("level-form");
const levelElement = document.getElementById("level");
const gameOverElement = document.getElementById("gameover-container");

const words = [
  "allied",
  "backward",
  "betting",
  "confine",
  "confront",
  "crisp",
  "curb",
  "disturbing",
  "embarrass",
  "fundamental",
  "gamble",
  "hollow",
  "infectious",
  "interpretation",
];

// get item with key "mode" from local storage in the condition (if null then use normal)
const saveMode =
  localStorage.getItem("mode") !== null
    ? localStorage.getItem("mode")
    : "normal";

let randomWord;
let score = 0;
let duration;
let level;

const timeInterval = setInterval(updateDuration, 1000);

const getRandomWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

function displayWord() {
  randomWord = getRandomWord();
  wordElement.innerHTML = randomWord;
}

function updateScore() {
  score += 1;
  scoreElement.innerHTML = score;
}

function updateDuration() {
  duration--;
  durationElement.innerHTML = duration;
  if (duration === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

function gameOver() {
  gameOverElement.innerHTML = `
    <h1>Your score = ${score}</h1>
    <button class="play-again" onclick="location.reload()">Play Again</button>
    `;
  gameOverElement.style.display = "flex";
}

textElement.addEventListener("input", (e) => {
  const inputText = e.target.value;

  // if typing is correct then reset input value and generate new word
  if (inputText === randomWord) {
    if (saveMode == "easy") {
      duration += 5;
    } else if (saveMode == "normal") {
      duration += 3;
    } else if (saveMode == "hard") {
      duration += 2;
    }
    displayWord();
    updateScore();
    e.target.value = "";
  }
});

btnLevelElement.addEventListener("click", () => {
  settingsElement.classList.toggle("hide");
});

levelElement.addEventListener("change", (e) => {
  level = e.target.value;
  // keep value of "level" in local storage as key "mode"
  localStorage.setItem("mode", level);
});

function startGame() {
  levelElement.value = saveMode;

  displayWord();

  if (saveMode == "easy") {
    durationElement.innerText = 15;
    duration = 15;
  } else if (saveMode == "normal") {
    durationElement.innerText = 10;
    duration = 10;
  } else if (saveMode == "hard") {
    durationElement.innerText = 5;
    duration = 5;
  }
}

startGame();
textElement.focus();
