import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function Letter(props) {
  // Props
  const { value, currentStyle } = props;

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
        className="letter-input"
        type="text"
        onChange={(e) => setLetter(e.target.value)}
        style={{ backgroundColor: `${currentStyle}` }}
      />
    </>
  );
}

Letter.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  currentStyle: PropTypes.string,
};

export default Letter;
