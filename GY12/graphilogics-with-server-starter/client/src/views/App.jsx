import { GraphiLogics } from "./graphilogics/Graphilogics";
import LoginForm from "./auth/LoginForm";
import { useSelector } from "react-redux";
import { selectToken } from "../state/authSlice";

function App() {
  const token = useSelector(selectToken);

  if (!token) {
    return <LoginForm />;
  }

  return (
    <>
      <h1 className="m-4">GraphiLogics</h1>
      <GraphiLogics />
    </>
  );
}

export default App;
