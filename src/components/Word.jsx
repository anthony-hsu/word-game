import PropTypes from "prop-types";
import Letter from "./Letter";

function Word(props) {
  // Props
  const { value, wordIdx, currentRound, currentStyles } =
    props;

  const idxArr = [...Array(5).keys()];

  const isDisabled = (round) => {
    return round != currentRound;
  };

  const showLetters = (idx) => {
    return (
      <Letter
        key={idx}
        value={value[idx]}
        disabled={isDisabled(wordIdx)}
        currentStyle={currentStyles[wordIdx - 1][idx]}
      />
    );
  };

  return <div className="word-row">{idxArr.map(showLetters)}</div>;
}

Word.propTypes = {
  value: PropTypes.array,
  wordIdx: PropTypes.number,
  currentRound: PropTypes.number,
  currentStyles: PropTypes.array,
};

export default Word;
