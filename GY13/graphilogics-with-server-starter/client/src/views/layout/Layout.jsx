import { Outlet } from "react-router";
import AuthStatus from "../auth/AuthStatus";

export const Layout = () => {
  return (
    <>
      <h1>GraphiLogics</h1>
      <AuthStatus />
      <Outlet />
    </>
  );
};
