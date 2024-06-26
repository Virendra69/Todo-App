import React from "react";
import "../css/LandingPage.css";
import image_1 from "../assets/note-5913650_1280.png";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="landing-page-container">
      <p className="todo-app-title">Todo App</p>
      <img className="image-1" src={image_1} alt="Image 1" />
      <button
        className="continue"
        onClick={() => {
          navigate("/login/", {
            replace: true,
          });
        }}
      >
        Continue
      </button>
    </div>
  );
}
