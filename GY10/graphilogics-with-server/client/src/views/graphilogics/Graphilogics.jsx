import { useSelector } from "react-redux";
import { selectSolution } from "../../../state/nonogramSlice";

export const GraphiLogics = () => {
  const solution = useSelector(selectSolution);

  console.log(solution);

  return (
    <table id="layout">
      <tbody>
        <tr>
          <td></td>
          <td>
            <table id="felso">
              <tbody>
                <tr>
                  <td>
                    <span>1</span>
                    <span>2</span>
                  </td>
                  <td>
                    <span>1</span>
                  </td>
                  <td>
                    <span>1</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            <table id="bal">
              <tbody>
                <tr>
                  <td>
                    <span>1</span>
                    <span>1</span>
                  </td>
                </tr>
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <span>1</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>2</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
          <td>
            <table id="tabla">
              <tbody>
                <tr>
                  <td className="feher"></td>
                  <td className="szurke"></td>
                  <td className="fekete"></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
