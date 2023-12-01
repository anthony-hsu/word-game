import PropTypes from "prop-types";

function Keyboard(props) {
  const { letters, handleKeyTap } = props;

  const showLetters = (key) => {
    return (
      <div
        key={`key-${key}`}
        id={key}
        className={`keyboard-pos-${letters[key][0]} keyboard-key ${letters[key][1]}`}
        onClick={(e) => handleKeyTap(e)}
      >
        {key}
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
  handleKeyTap: PropTypes.func,
};

export default Keyboard;
