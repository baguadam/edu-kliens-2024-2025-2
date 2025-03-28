/* eslint-disable react/prop-types */
const Hangman = ({ wrongTips }) => {
  const parts = [
    <line x1="0" y1="99%" x2="100%" y2="99%" key={1} />,
    <line x1="20%" y1="99%" x2="20%" y2="5%" key={2} />,
    <line x1="20%" y1="5%" x2="60%" y2="5%" key={3} />,
    <line x1="60%" y1="5%" x2="60%" y2="20%" key={4} />,
    <circle cx="60%" cy="30%" r="10%" key={5} />,
    <line x1="60%" y1="30%" x2="60%" y2="70%" key={6} />,
    <line x1="40%" y1="50%" x2="80%" y2="50%" key={7} />,
    <line x1="60%" y1="70%" x2="50%" y2="90%" key={8} />,
    <line x1="60%" y1="70%" x2="70%" y2="90%" key={9} />,
  ];
  const partsToShow = parts.slice(0, wrongTips);

  return (
    <svg width="200px" height="200px" stroke="black">
      {partsToShow}
    </svg>
  );
};

export default Hangman;
