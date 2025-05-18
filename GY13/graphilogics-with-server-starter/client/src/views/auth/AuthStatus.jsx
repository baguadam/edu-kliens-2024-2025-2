import { logout, selectUser } from "../../state/authSlice";
import { useDispatch, useSelector } from "react-redux";

const AuthStatus = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return user ? (
    <>
      <p>Welcome, {user}</p>
      <button onClick={() => dispatch(logout())} className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700">
        Logout
      </button>
    </>
  ) : (
    <p>You are not logged in!</p>
  );
};

export default AuthStatus;
