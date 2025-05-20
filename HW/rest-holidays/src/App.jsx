import "./App.css";
import { Holidays } from "./Holidays";

function App() {
  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a href="#">Austria (AT)</a>
              </td>
            </tr>
            <tr>
              <td>
                <a href="#">Hungary (HU)</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <Holidays />
      </div>
    </>
  );
}

export default App;
