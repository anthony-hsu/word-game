import PropTypes from "prop-types";

function Keyboard(props) {
  const { letters } = props;
  const showLetters = (key) => {
    return <div key={`key-${key}`} id={`key-${key}`} className={`keyboard-key keyboard-pos-${letters[key][0]} ${letters[key][1]}`}>{key}</div>;
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
