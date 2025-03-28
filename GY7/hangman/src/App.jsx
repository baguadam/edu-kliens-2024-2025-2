import { useState } from "react";
import Buttons from "./Buttons";
import Hangman from "./Hangman";
import Result from "./Result";
import Word from "./Word";
import { wordList } from "https://cdn.jsdelivr.net/gh/vimtaai/elte-efop-feladattar@926d45a525eecee2f8ca159faa585192263ab196/tasks/hangman/solutions/04/words.js";

const random = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

const App = () => {
  // Application state (data)
  const maxWrongTips = 9;
  const word = "alma";
  const [tips, setTips] = useState([]);
  const buttonLetters = "aábcdeéfghiíjklmnoóöőpqrstuúüűvwxyz".split("");

  // Event handlers
  const handleLetterClick = (letter) => {
    setTips([...tips, letter]);
  };

  // Computed values
  const splitWord = word.split("");
  const wrongTips = tips.filter((tip) => !splitWord.includes(tip)).length;
  const won = splitWord.every((letter) => tips.includes(letter)) && wrongTips < maxWrongTips;
  const lost = wrongTips >= maxWrongTips;
  const wordObject = splitWord.map((letter) => ({
    letter,
    isVisible: lost || tips.includes(letter),
    missing: lost && !tips.includes(letter),
  }));

  return (
    <>
      <h1>Hangman</h1>

      <Word won={won} wordObject={wordObject} />

      <button>New game</button>
      <Buttons buttonLetters={buttonLetters} onClick={handleLetterClick} />

      <Result wrongTips={wrongTips} maxWrongTips={maxWrongTips} />

      <Hangman wrongTips={wrongTips} />
    </>
  );
};

export default App;
