import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { setClientToken } from "../../spotify";
import Sidebar from "../../component/sidebar";
import Login from "../auth/login";
import Favorites from "../favorites/favorites";
import Feed from "../feed/feed";
import Player from "../player";
import Trending from "../trending/trending";
import Library from "../library";
import "./home.css";

export default function Home() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);

  return !token ? (
    <Login />
  ) : (
    <Router>
      <div className="main-body">
        <Sidebar />
        <Routes>
          <Route path="/library" element={<Library />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/player" element={<Player />} />
          <Route path="/trending" element={<Trending />} />
        </Routes>
      </div>
    </Router>
  );
}
