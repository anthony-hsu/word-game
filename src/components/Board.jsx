import { generate } from "random-words";
import { useEffect, useState } from "react";
import Word from "./Word";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import Keyboard from "./Keyboard";
import Switch from "@mui/material/Switch";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton, Input } from "@mui/material";

function Board() {
  // "Constant States"
  const [maxTries, setMaxTries] = useState([6, 6]);
  const [wordLength, setWordLength] = useState([5, 5]);

  useEffect(() => {
    const divBoard = document.getElementById("div-page");
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
      Enter: ["enter", ""],
      Del: ["delete", ""],
    };
  };

  const getInitialWords = (ROUNDS, LENGTH) => {
    const _words = [];
    for (let rows = 0; rows < ROUNDS; rows += 1) {
      const initialWord = [];
      for (let cols = 0; cols < LENGTH; cols += 1) {
        initialWord.push("");
      }
      _words.push(initialWord);
    }
    return _words;
  };

  const getInitialStyles = (ROUNDS, LENGTH) => {
    const _currentStyles = [];
    for (let rows = 0; rows < ROUNDS; rows += 1) {
      const initialStyles = [];
      for (let cols = 0; cols < LENGTH; cols += 1) {
        initialStyles.push("");
      }
      _currentStyles.push(initialStyles);
    }
    return _currentStyles;
  };

  const initializeNewGame = (ROUNDS, LENGTH) => {
    setGameInProgress(true);
    setWords(getInitialWords(ROUNDS, LENGTH));
    setCurrentRound(1);
    setCurrentPos(0);
    setCurrentStyles(getInitialStyles(ROUNDS, LENGTH));
    setKeyboardLetters(getInitialKeyboardLetters());
    setTargetWord(
      generate({
        minLength: LENGTH,
        maxLength: LENGTH,
      }).toUpperCase()
    );
  };

  // States
  const [words, setWords] = useState(
    getInitialWords(maxTries[1], wordLength[1])
  );
  const [currentRound, setCurrentRound] = useState(1);
  const [currentPos, setCurrentPos] = useState(0);
  const [currentStyles, setCurrentStyles] = useState(
    getInitialStyles(maxTries[1], wordLength[1])
  );
  const [keyboardLetters, setKeyboardLetters] = useState(
    getInitialKeyboardLetters()
  );
  const [gameInProgress, setGameInProgress] = useState(false);
  const [targetWord, setTargetWord] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [showNewGame, setShowNewGame] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState([true, true]);

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
    const isWordValid = !validationArray.includes(false);

    if (isWordValid) {
      for (let i = 0; i < wordLength[1]; i += 1) {
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
      } else if (currentRound === maxTries[1]) {
        // Failure
        setShowFailure(true);
        setGameInProgress(false);
      }
      setCurrentRound(currentRound + 1);
      setCurrentPos(0);
    } else {
      for (let i = 0; i < wordLength[1]; i += 1) {
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
        currentPos < wordLength[1]
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

  const showWords = (word, idx) => {
    return (
      <Word
        key={idx}
        word={word}
        wordIdx={idx + 1}
        currentRound={currentRound}
        currentStyles={currentStyles}
        gameInProgress={gameInProgress}
      />
    );
  };

  return (
    <>
      <div id="div-page" onKeyDown={(e) => handleKeyDown(e)} tabIndex={0}>
        <div id="div-board-header">
          <div className="configs">
            <IconButton onClick={() => setShowSettings(true)}>
              <SettingsIcon fontSize="large" />
            </IconButton>
          </div>
          <h1 className="title">Word Game</h1>
        </div>
        <div id="div-board">
          <div>{words.map((word, idx) => showWords(word, idx))}</div>
          {/* <Button
            className={`${gameInProgress ? "" : "hidden"}`}
            onClick={handleSubmit}
          >
            Submit
          </Button> */}
          {showKeyboard[1] ? (
            <Keyboard
              letters={keyboardLetters}
              setLetters={setKeyboardLetters}
            />
          ) : (
            <></>
          )}
        </div>
      </div>

      <Modal show={showNewGame}>
        <Modal.Header closeButton>
          <h3>Welcome!</h3>
        </Modal.Header>
        <Modal.Body>
          {`Guess the mystery word in ${maxTries[1]} tries or less. Good luck!`}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              initializeNewGame(maxTries[1], wordLength[1]);
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
        <Modal.Body>{`The word was "${targetWord.toUpperCase()}". Play again?`}</Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              initializeNewGame(maxTries[1], wordLength[1]);
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
        <Modal.Body>{`The word was "${targetWord.toUpperCase()}". Try again?`}</Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              initializeNewGame(maxTries[1], wordLength[1]);
              setShowNewGame(false);
              setShowFailure(false);
            }}
          >
            New Game
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSettings} onHide={() => setShowSettings(false)}>
        <Modal.Header closeButton>
          <h3>Settings</h3>
        </Modal.Header>
        <Modal.Body>
          <div className="settings-container">
            <div className="setting">
              <div className="setting-name">
                <p>Show Keyboard</p>
              </div>
              <div className="setting-value">
                <Switch
                  checked={showKeyboard[0]}
                  onChange={(e) =>
                    setShowKeyboard([e.target.checked, showKeyboard[1]])
                  }
                />
              </div>
            </div>
            <div className="setting">
              <div className="setting-name">
                <p>Word Length</p>
              </div>
              <div className="setting-value">
                <Input
                  type="number"
                  value={wordLength[0]}
                  onChange={(e) =>
                    setWordLength([
                      Number(e.target.value),
                      Number(wordLength[1]),
                    ])
                  }
                />
              </div>
            </div>
            <div className="setting">
              <div className="setting-name">
                <p>Number of Attempts</p>
              </div>
              <div className="setting-value">
                <Input
                  type="number"
                  value={maxTries[0]}
                  onChange={(e) =>
                    setMaxTries([Number(e.target.value), Number(maxTries[1])])
                  }
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setShowKeyboard([showKeyboard[0], showKeyboard[0]]);
              setWordLength([wordLength[0], wordLength[0]]);
              setMaxTries([maxTries[0], maxTries[0]]);
              initializeNewGame(maxTries[0], wordLength[0]);
              setShowSettings(false);
            }}
          >
            Save
          </Button>
          <Button onClick={() => setShowSettings(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Board;
