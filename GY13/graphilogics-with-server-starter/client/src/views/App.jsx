import { GraphiLogics } from "./graphilogics/Graphilogics";
import LoginForm from "./auth/LoginForm";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./layout/Layout";
import RequireAuth from "./auth/RequireAuth";
import { NewPuzzle } from "./graphilogics/NewPuzzle";
import { useGetPuzzlesQuery } from "../state/puzzlesApiSlice";

function App() {
  const { data: puzzles } = useGetPuzzlesQuery();

  console.log(puzzles);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <GraphiLogics />
                <NewPuzzle />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
