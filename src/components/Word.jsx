import PropTypes from "prop-types";
import Letter from "./Letter";

function Word(props) {
  // Props
  const { word, wordIdx, currentRound, currentStyles, gameInProgress } = props;

  const idxArr = [...Array(word.length).keys()];

  const isDisabled = (round) => {
    return round != currentRound;
  };

  const showLetters = (idx) => {
    return (
      <Letter
        key={idx}
        letter={word[idx]}
        disabled={isDisabled(wordIdx)}
        currentStyle={currentStyles[wordIdx - 1][idx]}
        gameInProgress={gameInProgress}
      />
    );
  };

  return <div className="word-row">{idxArr.map(showLetters)}</div>;
}

Word.propTypes = {
  word: PropTypes.array,
  wordIdx: PropTypes.number,
  currentRound: PropTypes.number,
  currentStyles: PropTypes.array,
  gameInProgress: PropTypes.bool,
};

export default Word;
