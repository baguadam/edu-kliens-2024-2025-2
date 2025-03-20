import { useState } from "react";

const Incrementer = () => {
  const [count, setCount] = useState();

  const handleIncrementTwiceClick = () => {
    setCount((c) => c + 1);
    setCount((c) => c + 1);
  };

  return (
    <>
      <span>Érték: {count}</span>
      <button onClick={handleIncrementTwiceClick}>+2</button>
    </>
  );
};

export default Incrementer;
