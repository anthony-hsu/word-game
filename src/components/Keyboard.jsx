import PropTypes from "prop-types";

function Keyboard(props) {
  const { letters } = props;
  const showLetters = (key) => {
    return (
      <div
        key={`key-${key}`}
        id={`key-${key}`}
        className={`keyboard-key-container keyboard-pos-${letters[key][0]}`}
      >
        <div
          className={`keyboard-key ${letters[key][1]}`}
          onTouchStart={() => console.log("Touch Activated")}
          onTouchEnd={() => console.log("Touch Ended")}
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
};

export default Keyboard;
