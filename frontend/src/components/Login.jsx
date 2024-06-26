import React, { useContext, useEffect, useState } from "react";
import "../css/Login.css";
import { AuthContext } from "./AuthContext";
import { useNavigate, Link } from "react-router-dom";
import show_password from "../assets/icons8-show-password-24.png";
import hide_password from "../assets/icons8-hide-password-24.png";

export default function SignIn() {
  const { saveToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  // Handle the input
  const handleChange = (event) => {
    setUser((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  // Send the data and login the user if the credentials are correct
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          alert("Incorrect credentials!");
        }
        return response.json();
      })
      .then((data) => {
        if (data["token"]) {
          saveToken(data["token"]);
          navigate("/tasks/", {
            replace: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Toggle to show/hide password
  useEffect(() => {
    if (show) {
      document.getElementsByClassName(
        "login-password"
      )[0].type = "text";
      document.getElementsByClassName(
        "login-show-password"
      )[0].src = hide_password;
    } else {
      document.getElementsByClassName(
        "login-password"
      )[0].type = "password";
      document.getElementsByClassName(
        "login-show-password"
      )[0].src = show_password;
    }
  }, [show]);

  // Condition to allow form submission
  useEffect(() => {
    if (user.username.length > 0 && user.password.length > 0) {
      document.getElementsByClassName(
        "login-submit-btn"
      )[0].disabled = false;
    } else {
      document.getElementsByClassName(
        "login-submit-btn"
      )[0].disabled = true;
    }
  }, [user]);

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <p className="login-heading">Login</p>
          <form onSubmit={handleSubmit} className="login-form">
            <input
              className="login-username"
              type="text"
              name="username"
              placeholder="Username..."
              value={user.username}
              onChange={handleChange}
            />
            <span className="login-password-container">
              <input
                type="password"
                name="password"
                placeholder="Password..."
                className="login-password"
                value={user.password}
                onChange={handleChange}
              />
              <img
                className="login-show-password"
                src={show_password}
                alt="show_password_icon"
                onClick={() => setShow((prev) => !prev)}
              />
            </span>
            <button className="login-submit-btn" type="submit">
              Submit
            </button>
            <Link className="register-link" to="/register/">Not registered? Register Now!</Link>
          </form>
        </div>
      </div>
    </>
  );
}
