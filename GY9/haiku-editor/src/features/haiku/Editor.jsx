import { useDispatch, useSelector } from "react-redux";
import styles from "./Editor.module.css";
import { addHaiku, changeText, selectEditor, selectHaikus } from "../../state/store";

export const Editor = () => {
  const editor = useSelector(selectEditor);
  const haikus = useSelector(selectHaikus);
  const dispatch = useDispatch();

  console.log(haikus);

  // const handleInput = (e) => {
  //   dispatch({
  //     type: "CHANGE_TEXT",
  //     payload: e.target.value,
  //   });
  // };

  const isHaiku = false;
  return (
    <div>
      <textarea
        rows="4"
        cols="40"
        className={isHaiku ? styles.good : styles.wrong}
        value={editor}
        onInput={(e) => dispatch(changeText(e.target.value))}
      ></textarea>
      <p>Vowels per row: 1,2,3</p>
      <button onClick={() => dispatch(addHaiku("VALAMIII"))}>Add</button>
      <button>Save</button>
    </div>
  );
};
