import "./App.css";
import { Details } from "./Details";

function App() {
  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Result</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="selected">
              <td>
                1
              </td>
              <td>
                Teszt Béla
              </td>
              <td>
                4
              </td>
              <td>
                <button>Modify</button>
                <button>Remove</button>
              </td>
            </tr>
            <tr>
              <td>
                2
              </td>
              <td>
                Teszt Elek
              </td>
              <td>
                5
              </td>
              <td>
                <button>Modify</button>
                <button>Remove</button>
              </td>
            </tr>
          </tbody>
        </table>

        <span>
          <button>New Result</button>
        </span>
      </div>

      <div>
        <Details />
      </div>
    </>
  );
}

export default App;
