import { useDispatch, useSelector } from "react-redux";
import { removeHaiku, selectHaiku, selectHaikus } from "../../state/haikuSlice";

export const HaikuList = () => {
  const haikus = useSelector(selectHaikus);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Haiku list</h2>
      <div>
        {haikus.map((haiku, idx) => (
          <pre key={idx} onClick={() => dispatch(selectHaiku(idx))}>
            {haiku}
          </pre>
        ))}
        <button onClick={() => dispatch(removeHaiku())}>Remove</button>
      </div>
    </div>
  );
};
