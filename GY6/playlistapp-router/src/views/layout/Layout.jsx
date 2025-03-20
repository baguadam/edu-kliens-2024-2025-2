import React from "react";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="w-10/12 mx-auto">
      <Outlet />
    </div>
  );
}
