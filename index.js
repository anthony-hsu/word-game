// TO BE DEPRECATED: Get target word from dictionary API.
const wordBank = [
  "super",
  "hello",
  "gassy",
  "faces",
  "mover",
  "cough",
  "sweet",
  "ember",
  "donut",
  "input",
  "total",
  "heavy",
  "pushy",
  "penis",
  "ideal",
  "isles",
  "queer",
  "proud",
  "plane",
  "drink",
  "marsh",
  "harsh",
  "great",
  "grate",
  "spray",
  "gourd",
  "bunch",
  "nexus",
  "clear",
];
const randomIndex = Math.floor(Math.random() * wordBank.length);
const targetWord = wordBank[randomIndex];

// Elements
var letter1 = document.createElement("input");
var letter2 = document.createElement("input");
var letter3 = document.createElement("input");
var letter4 = document.createElement("input");
var letter5 = document.createElement("input");
const board = document.getElementById("board");
const btnNewGame = document.getElementById("btn-new-game");
btnNewGame.addEventListener("click", handleNewGame);
const btnSubmit = document.getElementById("btn-submit");
btnSubmit.addEventListener("click", handleSubmit);
const resultText = document.getElementById("game-result");

// "States"
const roundCounter = 1;

// Functions
function handleNewGame() {
  initializeNewRow();
  btnSubmit.classList.toggle("hidden");
  btnNewGame.classList.toggle("hidden");
}

function initializeNewRow() {
  board.appendChild(document.createElement("br"));
  letter1 = document.createElement("input");
  letter1.type = "text";
  letter1.classList.add("letter-input");
  letter1.addEventListener("keyup", () => {
    letter2.focus();
  })
  letter2 = document.createElement("input");
  letter2.type = "text";
  letter2.classList.add("letter-input");
  letter2.addEventListener("keyup", () => {
    letter3.focus();
  })
  letter3 = document.createElement("input");
  letter3.type = "text";
  letter3.classList.add("letter-input");
  letter3.addEventListener("keyup", () => {
    letter4.focus();
  })
  letter4 = document.createElement("input");
  letter4.type = "text";
  letter4.classList.add("letter-input");
  letter4.addEventListener("keyup", () => {
    letter5.focus();
  })
  letter5 = document.createElement("input");
  letter5.type = "text";
  letter5.classList.add("letter-input");
  letter5.addEventListener("keyup", () => {
    btnSubmit.focus();
  })
  board.appendChild(letter1);
  board.appendChild(letter2);
  board.appendChild(letter3);
  board.appendChild(letter4);
  board.appendChild(letter5);
}

function handleSubmit() {
  // Validation: Handle empty strings.
  if (
    letter1.value === "" ||
    letter2.value === "" ||
    letter3.value === "" ||
    letter4.value === "" ||
    letter5.value === ""
  ) {
    console.log("Missing letter");
    return;
  }

  const guessedWord = "".concat(
    letter1.value,
    letter2.value,
    letter3.value,
    letter4.value,
    letter5.value
  );

  if (guessedWord === targetWord) {
    btnNewGame.classList.remove("hidden");
    btnSubmit.classList.add("hidden");
    letter1.classList.add("green");
    letter2.classList.add("green");
    letter3.classList.add("green");
    letter4.classList.add("green");
    letter5.classList.add("green");
    resultText.innerText = `Success! The word was: ${targetWord}.`;
  } else {
    if (targetWord.includes(letter1.value)) {
      if (targetWord[0] === letter1.value) {
        letter1.classList.add("green");
      } else {
        letter1.classList.add("yellow");
      }
    } else {
      letter1.classList.remove("green");
      letter1.classList.remove("yellow");
    }
    if (targetWord.includes(letter2.value)) {
      if (targetWord[1] === letter2.value) {
        letter2.classList.add("green");
      } else {
        letter2.classList.add("yellow");
      }
    } else {
      letter2.classList.remove("green");
      letter2.classList.remove("yellow");
    }
    if (targetWord.includes(letter3.value)) {
      if (targetWord[2] === letter3.value) {
        letter3.classList.add("green");
      } else {
        letter3.classList.add("yellow");
      }
    } else {
      letter3.classList.remove("green");
      letter3.classList.remove("yellow");
    }
    if (targetWord.includes(letter4.value)) {
      if (targetWord[3] === letter4.value) {
        letter4.classList.add("green");
      } else {
        letter4.classList.add("yellow");
      }
    } else {
      letter4.classList.remove("green");
      letter4.classList.remove("yellow");
    }
    if (targetWord.includes(letter5.value)) {
      if (targetWord[4] === letter5.value) {
        letter5.classList.add("green");
      } else {
        letter5.classList.add("yellow");
      }
    } else {
      letter5.classList.remove("green");
      letter5.classList.remove("yellow");
    }
    resultText.innerText = `Try again!`;

    initializeNewRow();
  }
}
