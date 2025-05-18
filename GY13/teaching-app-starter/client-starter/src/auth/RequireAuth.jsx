import { useSelector } from "react-redux";
import { selectToken } from "./authSlice";
import { Navigate } from "react-router";

export default function RequireAuth({ children }) {
  const token = useSelector(selectToken);
  return token ? children : <Navigate to="/login" replace />;
}
