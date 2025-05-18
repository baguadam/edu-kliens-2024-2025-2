/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { selectUser } from "../../state/authSlice";
import { Navigate } from "react-router";

const RequireAuth = ({ children }) => {
  const user = useSelector(selectUser);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;
