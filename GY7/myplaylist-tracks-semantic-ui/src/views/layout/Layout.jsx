/* eslint-disable react/prop-types */
import { Menu } from "../menu/Menu";

export function Layout({ children }) {
  return (
    <div className="ui container">
      <Menu />
      {children}
    </div>
  );
}
