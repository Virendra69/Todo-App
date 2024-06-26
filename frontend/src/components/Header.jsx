import React, { useContext, useEffect } from "react";
import profile_photo from "../assets/icons8-male-user-50.png";
import "../css/Header.css";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const { authToken, removeToken } = useContext(AuthContext);

  // Get the username
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/get-username/", {
      method: "GET",
      headers: {
        Authorization: `Token ${authToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Network response is not ok!");
        }
        return response.json();
      })
      .then((data) => {
        if (data["username"]) {
          document.getElementsByClassName("username")[0].textContent =
            data["username"];
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Logout the user
  const handleClick = () => {
    fetch("http://127.0.0.1:8000/api/logoutall/", {
      method: "POST",
      headers: {
        Authorization: `Token ${authToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Network response was not ok!");
        }
        return response.json();
      })
      .then((data) => {
        if (data["status"]) {
          removeToken();
          navigate("/login/", {
            replace: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <header>
      <p className="app-title">Todo App</p>
      <div className="profile-box">
        <div className="username-and-logout">
          <p className="username"></p>
          <p className="logout" onClick={handleClick}>
            Logout
          </p>
        </div>
        <img
          className="profile-photo"
          src={profile_photo}
          alt="profile_photo"
        />
      </div>
    </header>
  );
}
