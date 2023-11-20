import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function Letter(props) {
  // Props
  const { value, currentStyle, gameInProgress } = props;

  // States
  const [letter, setLetter] = useState(value);

  useEffect(() => {
    setLetter(value);
  }, [value]);

  return (
    <>
      <input
        readOnly
        value={letter}
        className={`${currentStyle} ${gameInProgress ? "" : "disabled"} letter-input`}
        type="text"
        onChange={(e) => setLetter(e.target.value)}
      />
    </>
  );
}

Letter.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  currentStyle: PropTypes.string,
  gameInProgress: PropTypes.bool,
};

export default Letter;
