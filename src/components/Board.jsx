import { generate } from "random-words";
import { useState } from "react";
import Word from "./Word";

function Board() {
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
    setCurrentStyles(getInitialStyles());
    setCurrentRound(1);
    setTargetWord(generate({ minLength: 5, maxLength: 5 }));
  };

  // States
  const [words, setWords] = useState(getInitialWords());
  const [currentRound, setCurrentRound] = useState(1);
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
    } else {
      for (let i = 0; i < 5; i += 1) {
        _currentStyles[currentRound - 1][i] = validationArray[i] ? "" : "red";
      }
      console.log(_currentStyles);
      setCurrentStyles(_currentStyles);
    }
  };

  const handleWordChange = (newWord) => {
    const _words = words;
    _words[currentRound - 1] = newWord;
    setWords(_words);
  };

  return (
    <>
      {gameInProgress ? (
        <>
          <Word
            value={words[currentRound - 1]}
            wordIdx={1}
            currentRound={currentRound}
            handleWordChange={handleWordChange}
            currentStyles={currentStyles}
          />
          <Word
            value={words[currentRound - 1]}
            wordIdx={2}
            currentRound={currentRound}
            handleWordChange={handleWordChange}
            currentStyles={currentStyles}
          />
          <Word
            value={words[currentRound - 1]}
            wordIdx={3}
            currentRound={currentRound}
            handleWordChange={handleWordChange}
            currentStyles={currentStyles}
          />
          <Word
            value={words[currentRound - 1]}
            wordIdx={4}
            currentRound={currentRound}
            handleWordChange={handleWordChange}
            currentStyles={currentStyles}
          />
          <Word
            value={words[currentRound - 1]}
            wordIdx={5}
            currentRound={currentRound}
            handleWordChange={handleWordChange}
            currentStyles={currentStyles}
          />
          <Word
            value={words[currentRound - 1]}
            wordIdx={6}
            currentRound={currentRound}
            handleWordChange={handleWordChange}
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
    </>
  );
}

export default Board;
