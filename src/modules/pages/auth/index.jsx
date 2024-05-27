// modules/pages/auth/index.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icons from "../../../icon";
import { GetLinks } from "../../../core";

const menus = [
  {
    path: "/dashboard",
    icon: "dashboard-fill",
    key: 1,
    isAdmin: false,
    label: "Dashboard",
    // isChild: [
    //   {
    //     path: "/email-setup",
    //     icon: "email-setup",
    //     label: "Email Setup",
    //   },
    // ],
  },
  {
    path: "/cards",
    icon: "system-check",
    isAdmin: false,
    label: "Cards",
    key: 2,
  },
  {
    path: "/date-picker",
    icon: "dashboard",
    isAdmin: true,
    label: "Date Picker",
    key: 3,
  },
  {
    path: "/table",
    icon: "analytics",
    isAdmin: true,
    label: "Table",
    key: 4,
  },
  {
    path: "/menu-items",
    icon: "setting",
    isAdmin: true,
    label: "Menu Items",
    key: 5,
  },
];

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Here, you would typically validate the username and password
    // For simplicity, let's assume a successful login if both fields are filled
    if (username && password) {
      // Store the user information in localStorage
      localStorage.setItem("isLoggedIn", "true");
      // During login or after fetching the menu data
      localStorage.setItem("menus", JSON.stringify(menus));
      // Navigate to the layout/dashboard page
      navigate("/menu-items");
    } else {
      // Handle invalid login
      alert("Invalid username or password");
    }
  };

  useEffect(() => {
    localStorage.setItem(
      "token",
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImp0aSI6IiJ9.eyJpc3MiOiIiLCJhdWQiOiIiLCJqdGkiOiIiLCJpYXQiOjE3MTY3ODUxMDQsImV4cCI6MTcxNjg3MTUwNCwidWlkIjoiMiJ9.lF_tgcEOFy1CQglFLEhCAc6NY4tpgnq-gMouWdNSfW8"
    );
  }, []);

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card p-5">
        <h1 className="text-center mb-4">Login</h1>
        <div className="form-group">
          <input
            type="text"
            className="form-control mb-4"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group mb-4">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group text-center">
          <button className="btn btn-primary btn-block " onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
