import { useDispatch, useSelector } from "react-redux";
import { COLORS, fillCell, selectSolutionObject, selectTable } from "../../state/nonogramSlice";
import { useGetPuzzlesQuery } from "../../state/puzzlesApiSlice";

export const GraphiLogics = () => {
  const { leftNumbers, upperNumbers } = useSelector(selectSolutionObject);
  const table = useSelector(selectTable);
  const dispatch = useDispatch();

  const { data, isLoading } = useGetPuzzlesQuery();

  const handleLeftClick = (row, column, currentColor) => {
    dispatch(
      fillCell({
        row,
        column,
        color: currentColor === COLORS.WHITE ? COLORS.BLACK : COLORS.BLACK ? COLORS.WHITE : currentColor,
      })
    );
  };

  const handleRightClick = (e, row, column, currentColor) => {
    e.preventDefault();
    dispatch(
      fillCell({
        row,
        column,
        color: currentColor === COLORS.GRAY ? COLORS.WHITE : currentColor === COLORS.WHITE ? COLORS.GRAY : currentColor,
      })
    );
  };

  if (isLoading) {
    return <p>Game is loading...</p>;
  }

  return (
    <table id="layout" className="m-4">
      <tbody>
        <tr>
          <td></td>
          <td>
            <table id="felso">
              <tbody>
                <tr>
                  {upperNumbers.map((block, i) => (
                    <td key={i}>
                      {block.map((color, j) => (
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
                {leftNumbers.map((row, i) => (
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
                            : color === COLORS.GRAY
                            ? "szurke"
                            : color === COLORS.BLACK
                            ? "fekete"
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
