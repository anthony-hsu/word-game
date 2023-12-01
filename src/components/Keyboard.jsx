import PropTypes from "prop-types";

function Keyboard(props) {
  const { letters, setLetters } = props;

  const handleTouchStart = (key) => {
    const _letters = letters;
    _letters[key][1] = "green";
    setLetters(_letters);
  };

  const handleTouchEnd = (key) => {
    const _letters = letters;
    _letters[key][1] = "yellow";
    setLetters(_letters);
  };

  const showLetters = (key) => {
    return (
      <div
        key={`key-${key}`}
        id={`key-${key}`}
        className={`keyboard-key-container keyboard-pos-${letters[key][0]}`}
      >
        <div
          className={`keyboard-key ${letters[key][1]}`}
          onClick={() => handleTouchStart(key)}
          onMouseUp={() => handleTouchEnd(key)}
        >
          <p>{key}</p>
        </div>
      </div>
    );
  };
  return (
    <div className="keyboard-container">
      {Object.keys(letters).map(showLetters)}
    </div>
  );
}

Keyboard.propTypes = {
  letters: PropTypes.object,
  setLetters: PropTypes.func,
};

export default Keyboard;
