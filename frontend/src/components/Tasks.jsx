import React, { useState } from "react";
import TaskInfo from "./TaskInfo";
import ShowTask from "./ShowTask";
import UpdateTask from "./UpdateTask";
import AddTask from "./AddTask";
import Header from "./Header";
import "../css/Tasks.css";

export default function Tasks() {
  const [taskID, setTaskID] = useState(0);
  const [showPage, setShowPage] = useState("show");

  return (
    <>
      <Header />
      <div className="main-content">
        <div className="tasks-container">
          {showPage === "show" && (
            <ShowTask setTaskID={setTaskID} setShowPage={setShowPage} />
          )}
          {showPage === "update" && (
            <UpdateTask taskID={taskID} setShowPage={setShowPage} />
          )}
          {showPage === "add" && (
            <AddTask taskID={taskID} setShowPage={setShowPage} />
          )}
          {showPage === "info" && (
            <TaskInfo taskID={taskID} setShowPage={setShowPage} />
          )}
        </div>
      </div>
    </>
  );
}
