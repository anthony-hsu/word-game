import { generate, wordList } from "random-words";
import { useEffect, useState } from "react";
import Word from "./Word";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import Keyboard from "./Keyboard";

function Board() {
  useEffect(() => {
    const divBoard = document.getElementById("div-board");
    divBoard.focus();
  });

  const getInitialKeyboardLetters = () => {
    return {
      Q: [1, ""],
      W: [2, ""],
      E: [3, ""],
      R: [4, ""],
      T: [5, ""],
      Y: [6, ""],
      U: [7, ""],
      I: [8, ""],
      O: [9, ""],
      P: [10, ""],
      A: [11, ""],
      S: [12, ""],
      D: [13, ""],
      F: [14, ""],
      G: [15, ""],
      H: [16, ""],
      J: [17, ""],
      K: [18, ""],
      L: [19, ""],
      Z: [20, ""],
      X: [21, ""],
      C: [22, ""],
      V: [23, ""],
      B: [24, ""],
      N: [25, ""],
      M: [26, ""],
    };
  };

  const getInitialWords = () => {
    const _words = [];
    for (let rows = 0; rows < 6; rows += 1) {
      const initialWord = [];
      for (let cols = 0; cols < 5; cols += 1) {
        initialWord.push("");
      }
      _words.push(initialWord);
    }
    return _words;
  };

  const getInitialStyles = () => {
    const _currentStyles = [];
    for (let rows = 0; rows < 6; rows += 1) {
      const initialStyles = [];
      for (let cols = 0; cols < 5; cols += 1) {
        initialStyles.push("");
      }
      _currentStyles.push(initialStyles);
    }
    return _currentStyles;
  };

  const initializeNewGame = () => {
    setGameInProgress(true);
    setWords(getInitialWords());
    setCurrentRound(1);
    setCurrentPos(0);
    setCurrentStyles(getInitialStyles());
    setKeyboardLetters(getInitialKeyboardLetters());
    setTargetWord(generate({ minLength: 5, maxLength: 5 }).toUpperCase());
  };

  // States
  const [words, setWords] = useState(getInitialWords());
  const [currentRound, setCurrentRound] = useState(1);
  const [currentPos, setCurrentPos] = useState(0);
  const [currentStyles, setCurrentStyles] = useState(getInitialStyles());
  const [keyboardLetters, setKeyboardLetters] = useState(
    getInitialKeyboardLetters()
  );
  const [gameInProgress, setGameInProgress] = useState(false);
  const [targetWord, setTargetWord] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [showNewGame, setShowNewGame] = useState(true);

  const getValidationArray = (currentWord) => {
    const results = currentWord.map((letter) => {
      // Validate for:
      // 1. blank spaces
      // 2. alpha-only characters
      // 3. dictionary-valid words
      if (
        letter === "" ||
        letter.charCodeAt() > "Z".charCodeAt() ||
        letter.charCodeAt() < "A".charCodeAt()
      ) {
        return false;
      } else {
        return true;
      }
    });
    return results;
  };

  const handleSubmit = () => {
    const targetWordArr = targetWord.split("");
    const currentWord = words[currentRound - 1];
    const currentWordString = currentWord.join("");
    const _currentStyles = currentStyles.map((style) => {
      return style;
    });
    const _keyboardLetters = keyboardLetters;
    const validationArray = getValidationArray(currentWord);
    const isWordValid =
      wordList.includes(currentWordString.toLowerCase()) &&
      !validationArray.includes(false);

    if (isWordValid) {
      for (let i = 0; i < 5; i += 1) {
        if (targetWordArr.includes(currentWord[i])) {
          if (currentWord[i] === targetWordArr[i]) {
            _currentStyles[currentRound - 1][i] = "green";
            _keyboardLetters[currentWord[i]][1] = "green";
          } else {
            _currentStyles[currentRound - 1][i] = "yellow";
            _keyboardLetters[currentWord[i]][1] = "yellow";
          }
        } else {
          _currentStyles[currentRound - 1][i] = "notfound";
          _keyboardLetters[currentWord[i]][1] = "notfound";
        }
      }
      setCurrentStyles(_currentStyles);
      setKeyboardLetters(_keyboardLetters);

      if (currentWordString === targetWord) {
        // Success
        setShowSuccess(true);
        setGameInProgress(false);
      } else if (currentRound === 6) {
        // Failure
        setShowFailure(true);
        setGameInProgress(false);
      }
      setCurrentRound(currentRound + 1);
      setCurrentPos(0);
    } else {
      for (let i = 0; i < 5; i += 1) {
        _currentStyles[currentRound - 1][i] =
          _currentStyles[currentRound - 1][i] === "invalid"
            ? "invalid-reverse"
            : "invalid";
      }
      setCurrentStyles(_currentStyles);
    }
  };

  const handleKeyDown = (e) => {
    if (gameInProgress) {
      const _words = words;
      if (
        e.key.charCodeAt() >= "a".charCodeAt() &&
        e.key.charCodeAt() <= "z".charCodeAt() &&
        currentPos < 5
      ) {
        // Valid character
        _words[currentRound - 1][currentPos] = e.key.toUpperCase();
        setWords(_words);
        setCurrentPos(currentPos + 1);
      } else if (e.key === "Backspace" && currentPos > 0) {
        // Delete character
        _words[currentRound - 1][currentPos - 1] = "";
        setWords(_words);
        setCurrentPos(currentPos - 1);
      } else if (e.key === "Enter") {
        handleSubmit();
      }
    }
  };

  return (
    <>
      <div id="div-board" onKeyDown={(e) => handleKeyDown(e)} tabIndex={0}>
        <h1>Word Game</h1>
        <div>
          <Word
            value={words[0]}
            wordIdx={1}
            currentRound={currentRound}
            currentStyles={currentStyles}
            gameInProgress={gameInProgress}
          />
          <Word
            value={words[1]}
            wordIdx={2}
            currentRound={currentRound}
            currentStyles={currentStyles}
            gameInProgress={gameInProgress}
          />
          <Word
            value={words[2]}
            wordIdx={3}
            currentRound={currentRound}
            currentStyles={currentStyles}
            gameInProgress={gameInProgress}
          />
          <Word
            value={words[3]}
            wordIdx={4}
            currentRound={currentRound}
            currentStyles={currentStyles}
            gameInProgress={gameInProgress}
          />
          <Word
            value={words[4]}
            wordIdx={5}
            currentRound={currentRound}
            currentStyles={currentStyles}
            gameInProgress={gameInProgress}
          />
          <Word
            value={words[5]}
            wordIdx={6}
            currentRound={currentRound}
            currentStyles={currentStyles}
            gameInProgress={gameInProgress}
          />
        </div>
        <Button
          className={`${gameInProgress ? "" : "hidden"}`}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Keyboard letters={keyboardLetters} />
      </div>

      <Modal show={showNewGame} onHide={() => setShowNewGame(false)}>
        <Modal.Header closeButton>
          <h3>Welcome!</h3>
        </Modal.Header>
        <Modal.Body>
          Guess the mystery word in 6 tries or less. Good luck!
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              initializeNewGame();
              setShowNewGame(false);
            }}
          >
            Start Game
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSuccess} onHide={() => setShowSuccess(false)}>
        <Modal.Header closeButton>
          <h3>Success!</h3>
        </Modal.Header>
        <Modal.Body>Play again?</Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              initializeNewGame();
              setShowNewGame(false);
              setShowSuccess(false);
            }}
          >
            New Game
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showFailure} onHide={() => setShowFailure(false)}>
        <Modal.Header closeButton>
          <h3>Game Over!</h3>
        </Modal.Header>
        <Modal.Body>{`The word was "${targetWord}". Try again?`}</Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              initializeNewGame();
              setShowNewGame(false);
              setShowFailure(false);
            }}
          >
            New Game
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Board;
