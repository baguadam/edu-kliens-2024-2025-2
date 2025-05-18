// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router";
import LoginForm from "./auth/LoginForm";
import RequireAuth from "./auth/RequireAuth";
import Layout from "./layout/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />

        <Route
          path="/*"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
