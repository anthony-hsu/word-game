import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function Letter(props) {
  // Props
  const { letter, currentStyle, gameInProgress } = props;

  // States
  const [letterInput, setLetterInput] = useState(letter);

  useEffect(() => {
    setLetterInput(letter);
  }, [letter]);

  return (
    <>
      <input
        readOnly
        value={letterInput}
        className={`${currentStyle} ${gameInProgress ? "" : "disabled"} letter-input`}
        type="text"
        onChange={(e) => setLetterInput(e.target.value)}
      />
    </>
  );
}

Letter.propTypes = {
  letter: PropTypes.string,
  disabled: PropTypes.bool,
  currentStyle: PropTypes.string,
  gameInProgress: PropTypes.bool,
};

export default Letter;
