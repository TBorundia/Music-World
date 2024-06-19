import React from "react";
import { loginEndpoint } from "../../spotify";
import "./login.css";

export default function Login() {
  return (
    <div className="login-page">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNrULoqmqmawcW_Fxcb4MVcF5UHAPqHbWtog&s"
        alt="logo-music-world"
        className="logo"
      />
      <a href={loginEndpoint}>
        <div className="login-btn">LOG IN</div>
      </a>
    </div>
  );
}
