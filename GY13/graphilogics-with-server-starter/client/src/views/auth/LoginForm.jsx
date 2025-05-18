import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../state/authSlice";
import { useLoginMutation } from "../../state/puzzlesApiSlice";
import { useNavigate } from "react-router";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // mutation
  const [sendLogin] = useLoginMutation();

  // handlers
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    const newErrors = {};
    if (username === "") {
      newErrors.username = "Username cannot be empty!";
    }
    if (password === "") {
      newErrors.password = "Password cannot be empty!";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    }

    // login
    try {
      const result = await sendLogin({ username, password }).unwrap();

      // dispatch
      dispatch(
        login({
          user: result.user.email,
          token: result.accessToken,
        })
      );

      navigate("/", { replace: true });
    } catch (err) {
      const currentError = {};
      currentError.auth = "Failed to log in: wrong email or password";
      setErrors(currentError);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">Bejelentkezés</h2>

        {errors.auth && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded">{errors.auth}</div>
        )}

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
