import PropTypes from "prop-types";
import { useState } from "react";
import Letter from "./Letter";

function Word(props) {
  // States
  const [wordArr, setWordArr] = useState(Array(5).fill(""));

  // Props
  const { value, wordIdx, currentRound, handleWordChange, currentStyles } = props;

  const idxArr = [...Array(5).keys()];
  const handleLetterChange = (idx, letter) => {
    const _wordArr = wordArr;
    _wordArr[idx] = letter;
    setWordArr(_wordArr);
    handleWordChange(_wordArr);
  };

  const isDisabled = (round) => {
    return round != currentRound;
  };

  const showLetters = (idx) => {
    return (
      <Letter
        value={value[idx]}
        key={idx}
        idx={idx}
        handleChange={handleLetterChange}
        disabled={isDisabled(wordIdx)}
        currentStyle={currentStyles[wordIdx-1][idx]}
      />
    );
  };

  return <div className="word-row">{idxArr.map(showLetters)}</div>;
}

Word.propTypes = {
  value: PropTypes.array,
  wordIdx: PropTypes.number,
  currentRound: PropTypes.number,
  handleWordChange: PropTypes.func,
  currentStyles: PropTypes.array,
};

export default Word;
