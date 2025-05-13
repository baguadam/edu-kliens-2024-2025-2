import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../state/authSlice";

export default function LoginForm() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  console.log(errors);

  // handlers
  const handleSubmit = (e) => {
    e.preventDefault();

    // validation
    const currentErrors = {};
    if (username === "") {
      currentErrors.username = "Username is missing!";
    }
    if (password === "") {
      currentErrors.password = "Password is missing!";
    }
    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    dispatch(
      login({
        user: username,
        token: password,
      })
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">Bejelentkezés</h2>

        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-1">
            Felhasználónév
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-1">
            Jelszó
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded">
          Bejelentkezés
        </button>
      </form>
    </div>
  );
}
