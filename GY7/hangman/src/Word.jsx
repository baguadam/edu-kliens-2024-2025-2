/* eslint-disable react/prop-types */
import cn from "classnames";
import Letter from "./Letter";

const Word = ({ won, wordObject }) => {
  return (
    <div id="szo" className={cn({ nyer: won })}>
      {wordObject.map(({ letter, isVisible, missing }, idx) => (
        <Letter key={idx} visible={isVisible} missing={missing}>
          {letter}
        </Letter>
      ))}
    </div>
  );
};

export default Word;
