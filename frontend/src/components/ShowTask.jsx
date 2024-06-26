import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import Task from "./Task";
import "../css/ShowTask.css";

export default function ShowTask(props) {
  const { authToken } = useContext(AuthContext);
  const [components, setComponents] = useState([]);
  const [showIncomplete, setShowIncomplete] = useState(true);

  // Get all tasks
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/get-all-tasks/", {
      method: "GET",
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
        data["tasks_serialized"].forEach((element) => {
          if (!element.completed === showIncomplete) {
            setComponents((prevComponents) => [
              ...prevComponents,
              <Task
                key={element.id}
                id={element.id}
                title={element.title}
                due_date={element.due_date}
                priority={element.priority}
                setTaskID={props.setTaskID}
                setShowPage={props.setShowPage}
              />,
            ]);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [showIncomplete]);

  // Go to Add Task section
  const handleClick = () => {
    props.setShowPage("add");
  };

  return (
    <>
      <div className="two-btns">
        <button className="add-new-task" onClick={handleClick}>
          New Task
        </button>
        <button
          className="add-new-task"
          onClick={() => {
            setShowIncomplete((prev) => !prev), setComponents([]);
          }}
        >
          Show {showIncomplete ? "Completed" : "Incomplete"} Tasks
        </button>
      </div>
      <div className="task-slide-box">{components}</div>
      <div className="priority-legend">
        <div className="low-priority">
          <div className="low-priority-symbol"></div>
          <div className="low-priority-text">Low</div>
        </div>
        <div className="medium-priority">
          <div className="medium-priority-symbol"></div>
          <div className="medium-priority-text">Medium</div>
        </div>
        <div className="high-priority">
          <div className="high-priority-symbol"></div>
          <div className="high-priority-text">High</div>
        </div>
      </div>
    </>
  );
}
