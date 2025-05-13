import { clickCell, COLORS, selectSolutionObject } from "../../state/nonogramSlice";
import { useDispatch, useSelector } from "react-redux";

export const GraphiLogics = () => {
  const { leftSideNumbers, upperSideNumbers, table } = useSelector(selectSolutionObject);
  const dispatch = useDispatch();

  const handleLeftClick = (row, col, currentColor) => {
    dispatch(
      clickCell({
        row,
        col,
        color:
          currentColor === COLORS.WHITE ? COLORS.BLACK : currentColor === COLORS.BLACK ? COLORS.WHITE : currentColor,
      })
    );
  };

  const handleRightClick = (e, row, col, currentColor) => {
    e.preventDefault();
    dispatch(
      clickCell({
        row,
        col,
        color:
          currentColor === COLORS.WHITE ? COLORS.GRAY : currentColor === COLORS.GRAY ? COLORS.WHITE : currentColor,
      })
    );
  };

  if (table.length === 0) {
    return <p>Game is loading...</p>;
  }

  return (
    <table id="layout">
      <tbody>
        <tr>
          <td></td>
          <td>
            <table id="felso">
              <tbody>
                <tr>
                  {upperSideNumbers.map((row, i) => (
                    <td key={i}>
                      {row.map((color, j) => (
                        <span key={j}>{color}</span>
                      ))}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            <table id="bal">
              <tbody>
                {leftSideNumbers.map((row, i) => (
                  <tr key={i}>
                    <td>
                      {row.map((color, j) => (
                        <span key={j}>{color}</span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
          <td>
            <table id="tabla">
              <tbody>
                {table.map((row, i) => (
                  <tr key={i}>
                    {row.map((color, j) => (
                      <td
                        onClick={() => handleLeftClick(i, j, color)}
                        onContextMenu={(e) => handleRightClick(e, i, j, color)}
                        key={j}
                        className={
                          color === COLORS.WHITE
                            ? "feher"
                            : color === COLORS.BLACK
                            ? "fekete"
                            : color === COLORS.GRAY
                            ? "szurke"
                            : "feher"
                        }
                      ></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
