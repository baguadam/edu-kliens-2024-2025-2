import React from "react";
import { Playlists } from "./views/playlists/Playlists";
import { Menu } from "./views/layout/Menu";
import { Home } from "./views/home/Home";
import { Tracks } from "./views/tracks/Tracks";
import { Search } from "./views/search/Search";
import { Layout } from "./views/layout/Layout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="playlists" element={<Playlists />}>
            <Route path=":id" element={<Playlists />} />
          </Route>
          <Route path="tracks" element={<Tracks />} />
          <Route path="search" element={<Search />} />
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
