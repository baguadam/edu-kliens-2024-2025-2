import React from "react";
import { FaHome as HomeIcon } from "react-icons/fa";
import { FaHeadphones as HeadphonesIcon } from "react-icons/fa";
import { FaSearch as SearchIcon } from "react-icons/fa";
import { FaMusic as MusicIcon } from "react-icons/fa";
import { FaUser as UserIcon } from "react-icons/fa";
import logo from "./logo.png";
import { Link } from "react-router-dom";

export const Menu = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>

          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link className="item" to="/">
                <HomeIcon /> Home
              </Link>
            </li>
            <li>
              <Link className="item" to="/playlists">
                <HeadphonesIcon /> My Playlists
              </Link>
            </li>
            <li>
              <Link className="item" to="/tracks">
                <MusicIcon /> Tracks
              </Link>
            </li>
            <li>
              <Link className="item" to="/search">
                <SearchIcon /> Search
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-64">
          <img src={logo} alt="" />
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link className="item" to="/">
              <HomeIcon /> Home
            </Link>
          </li>
          <li>
            <Link className="item" to="/playlists">
              <HeadphonesIcon /> My Playlists
            </Link>
          </li>
          <li>
            <Link className="item" to="/tracks">
              <MusicIcon /> Tracks
            </Link>
          </li>
          <li>
            <Link className="item" to="/search">
              <SearchIcon /> Search
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">
            <UserIcon />
            Jake Peralta
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52">
            <li>
              <a>Playlists</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
