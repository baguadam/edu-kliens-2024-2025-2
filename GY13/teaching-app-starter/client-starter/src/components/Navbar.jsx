import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../auth/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Link to="/students" className="hover:underline">
          Diákok
        </Link>
        <Link to="/students/new" className="hover:underline">
          Új diák hozzáadása
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
      >
        Kijelentkezés
      </button>
    </nav>
  );
}
