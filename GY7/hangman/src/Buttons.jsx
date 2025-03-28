/* eslint-disable react/prop-types */
const Buttons = ({ buttonLetters, onClick }) => {
  return (
    <div id="betuk">
      {buttonLetters.map((letter, idx) => (
        <button key={idx} disabled={false} onClick={() => onClick(letter)}>
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Buttons;
