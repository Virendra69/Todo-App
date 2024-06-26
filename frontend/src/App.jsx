import React from "react";
import Home from "./components/Home";
import Register from "./components/Register";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./components/LandingPage";
import Tasks from "./components/Tasks";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register/" element={<Register />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/tasks/" element={<ProtectedRoute component={<Tasks />} />} />
          <Route path="*" element={<ProtectedRoute component={<Home />} />} />
        </Routes>
      </Router>
    </>
  );
}
