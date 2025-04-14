import { useDispatch, useSelector } from "react-redux";
import styles from "./Editor.module.css";
import { addHaiku, changeText, modifyHaiku, selectEditor } from "../../state/haikuSlice";

export const Editor = () => {
  const { isHaiku, editor, vowelsPerRow } = useSelector(selectEditor);
  const dispatch = useDispatch();

  return (
    <div>
      <textarea
        rows="4"
        cols="40"
        className={isHaiku ? styles.good : styles.wrong}
        value={editor}
        onInput={(e) => dispatch(changeText(e.target.value))}
      ></textarea>
      <p>Vowels per row: {vowelsPerRow.join(",")}</p>
      {isHaiku && (
        <>
          <button onClick={() => dispatch(addHaiku(editor))}>Add</button>
          <button onClick={() => dispatch(modifyHaiku(editor))}>Save</button>
        </>
      )}
    </div>
  );
};
