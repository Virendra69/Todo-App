import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import show_password from "../assets/icons8-show-password-24.png";
import hide_password from "../assets/icons8-hide-password-24.png";
import "../css/Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [showP, setShowP] = useState(false);
  const [showCP, setShowCP] = useState(false);
  const [user, setUser] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  // Handle the inputs
  const handleChange = (event) => {
    setUser((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  // Send the user data to create a user
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data["message"]) {
          navigate("/login/", {
            replace: true,
          });
        } else {
          let error_message = "";
          if (data["username_error"]) {
            error_message += `${data["username_error"]}\n`;
          }
          if (data["email_error"]) {
            error_message += `${data["email_error"]}\n`;
          }
          if (data["password_error"]) {
            error_message += `${data["password_error"]}\n`;
          }
          if (error_message.length > 0) {
            alert(error_message);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Toggle to show/hide password and confirm password
  useEffect(() => {
    if (showP) {
      document.getElementsByClassName("register-password")[0].type = "text";
      document.getElementsByClassName("register-show-password")[0].src =
        hide_password;
    }
    if (!showP) {
      document.getElementsByClassName("register-password")[0].type = "password";
      document.getElementsByClassName("register-show-password")[0].src =
        show_password;
    }
    if (showCP) {
      document.getElementsByClassName("register-confirm-password")[0].type =
        "text";
      document.getElementsByClassName("register-confirm-show-password")[0].src =
        hide_password;
    }
    if (!showCP) {
      document.getElementsByClassName("register-confirm-password")[0].type =
        "password";
      document.getElementsByClassName("register-confirm-show-password")[0].src =
        show_password;
    }
  }, [showP, showCP]);

  // Condition to allow form submission
  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.firstname.length > 0 &&
      user.lastname.length > 0 &&
      user.email.length > 0 &&
      user.password === user.confirm_password
    ) {
      document.getElementsByClassName(
        "register-submit-btn"
      )[0].disabled = false;
    } else {
      document.getElementsByClassName("register-submit-btn")[0].disabled = true;
    }
  }, [user]);

  return (
    <div className="register-container">
      <div className="register-box">
        <p className="register-heading">Register</p>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="username"
            placeholder="Username..."
            className="register-username"
            value={user.username}
            onChange={handleChange}
          />
          <input
            type="text"
            name="firstname"
            placeholder="Firstname..."
            className="register-firstname"
            value={user.firstname}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastname"
            placeholder="Lastname..."
            className="register-lastname"
            value={user.lastname}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email..."
            className="register-email"
            value={user.email}
            onChange={handleChange}
          />
          <span className="register-password-container">
            <input
              type="password"
              name="password"
              placeholder="Password..."
              className="register-password"
              value={user.password}
              onChange={handleChange}
            />
            <img
              className="register-show-password"
              src={show_password}
              alt="show_password_icon"
              onClick={() => setShowP((prev) => !prev)}
            />
          </span>
          <span className="register-confirm-password-container">
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm Password..."
              className="register-confirm-password"
              value={user.confirm_password}
              onChange={handleChange}
            />
            <img
              className="register-confirm-show-password"
              src={show_password}
              alt="show_password_icon"
              onClick={() => setShowCP((prev) => !prev)}
            />
          </span>
          <button className="register-submit-btn" type="submit">
            Register
          </button>
          <Link to="/login/">Already Registered? Login</Link>
        </form>
      </div>
    </div>
  );
}
