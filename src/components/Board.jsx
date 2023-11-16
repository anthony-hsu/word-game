import { generate } from "random-words";
import { useEffect, useState } from "react";
import Word from "./Word";

function Board() {
  useEffect(() => {
    const divBoard = document.getElementById("div-board");
    divBoard.focus();
  });

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
    setTargetWord(generate({ minLength: 5, maxLength: 5 }));
  };

  // States
  const [words, setWords] = useState(getInitialWords());
  const [currentRound, setCurrentRound] = useState(1);
  const [currentPos, setCurrentPos] = useState(0);
  const [currentStyles, setCurrentStyles] = useState(getInitialStyles());
  const [gameInProgress, setGameInProgress] = useState(false);
  const [targetWord, setTargetWord] = useState("");

  const getValidationArray = (currentWord) => {
    const results = currentWord.map((letter) => {
      // Validate for:
      // 1. blank spaces
      // 2. alpha-only characters
      if (
        letter === "" ||
        letter.charCodeAt() > "z".charCodeAt() ||
        letter.charCodeAt() < "a".charCodeAt()
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
    const validationArray = getValidationArray(currentWord);
    const isWordValid = !validationArray.includes(false);

    if (isWordValid) {
      for (let i = 0; i < 5; i += 1) {
        if (targetWordArr.includes(currentWord[i])) {
          if (currentWord[i] === targetWordArr[i]) {
            _currentStyles[currentRound - 1][i] = "green";
          } else {
            _currentStyles[currentRound - 1][i] = "yellow";
          }
        } else {
          _currentStyles[currentRound - 1][i] = "lightgrey";
        }
      }
      setCurrentStyles(_currentStyles);

      if (currentWordString === targetWord) {
        // Success
        setGameInProgress(false);
      } else if (currentRound === 6) {
        // Failure
        setGameInProgress(false);
      }
      setCurrentRound(currentRound + 1);
      setCurrentPos(0);
    } else {
      for (let i = 0; i < 5; i += 1) {
        _currentStyles[currentRound - 1][i] = validationArray[i] ? "" : "red";
      }
      setCurrentStyles(_currentStyles);
    }
  };

  const handleKeyDown = (e) => {
    if (gameInProgress) {
      const _words = words;
      if (
        currentPos < 5 &&
        e.key.charCodeAt() >= "a".charCodeAt() &&
        e.key.charCodeAt() <= "z".charCodeAt()
      ) {
        // Valid character
        _words[currentRound - 1][currentPos] = e.key;
        setWords(_words);
        setCurrentPos(currentPos + 1);
      } else if (currentPos > 0 && e.key === "Backspace") {
        // Delete character
        _words[currentRound - 1][currentPos - 1] = "";
        setWords(_words);
        setCurrentPos(currentPos - 1);
      }
    }
  };

  return (
    <div id="div-board" onKeyDown={(e) => handleKeyDown(e)} tabIndex={0}>
      {gameInProgress ? (
        <>
          <Word
            value={words[0]}
            wordIdx={1}
            currentRound={currentRound}
            currentStyles={currentStyles}
          />
          <Word
            value={words[1]}
            wordIdx={2}
            currentRound={currentRound}
            currentStyles={currentStyles}
          />
          <Word
            value={words[2]}
            wordIdx={3}
            currentRound={currentRound}
            currentStyles={currentStyles}
          />
          <Word
            value={words[3]}
            wordIdx={4}
            currentRound={currentRound}
            currentStyles={currentStyles}
          />
          <Word
            value={words[4]}
            wordIdx={5}
            currentRound={currentRound}
            currentStyles={currentStyles}
          />
          <Word
            value={words[5]}
            wordIdx={6}
            currentRound={currentRound}
            currentStyles={currentStyles}
          />
          <button
            className={`${gameInProgress ? "" : "hidden"}`}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </>
      ) : (
        <></>
      )}
      <button
        className={`${gameInProgress ? "hidden" : ""}`}
        onClick={initializeNewGame}
      >
        New Game
      </button>
      <button onClick={() => console.log(targetWord)}>Show Word</button>
    </div>
  );
}

export default Board;
