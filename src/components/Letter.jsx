import PropTypes from "prop-types";
import { useState } from "react";

function Letter(props) {
  // Props
  const { value, idx, disabled, handleChange, currentStyle } = props;

  // States
  const [letter, setLetter] = useState(value);

  return (
    <>
      <input
        value={letter}
        className="letter-input"
        type="text"
        onChange={(e) => {
          setLetter(e.target.value);
          handleChange(idx, e.target.value);
        }}
        disabled={disabled}
        style={{ backgroundColor: `${currentStyle}` }}
      />
    </>
  );
}

Letter.propTypes = {
  value: PropTypes.string,
  idx: PropTypes.number,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
  currentStyle: PropTypes.string,
};

export default Letter;
