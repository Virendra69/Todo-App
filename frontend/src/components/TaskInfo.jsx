import React, { useContext, useEffect } from "react";
import "../css/TaskInfo.css";
import { AuthContext } from "./AuthContext";

export default function TaskInfo(props) {
  const { authToken } = useContext(AuthContext);

  const getPriorityName = (val) => {
    if (val === 1) {
      return "Low";
    } else if (val === 2) {
      return "Medium";
    } else if (val === 3) {
      return "High";
    }
  };

  // Send request and delete a particular task
  const deleteTask = (event) => {
    event.preventDefault();
    fetch(`http://127.0.0.1:8000/api/delete-task/${props.taskID}`, {
      method: "DELETE",
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
        if (data["message"] === "Task deleted successfully") {
          alert(data["message"]);
          props.setShowPage("show");
        } else if (data["error"]) {
          alert(`${data["message"]}\n${data["error"]}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Get details of a particular task
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/get-task/${props.taskID}`, {
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
        if (data["task_serialized"]) {
          document.getElementsByClassName(
            "task-info-title"
          )[0].innerHTML = `<strong>Title:</strong>${data["task_serialized"].title}`;
          document.getElementsByClassName(
            "task-info-description"
          )[0].innerHTML = `<strong>Description:</strong>${data["task_serialized"].description}`;
          document.getElementsByClassName(
            "task-info-due-date"
          )[0].innerHTML = `<strong>Due Date:</strong>${data["task_serialized"].due_date}`;
          document.getElementsByClassName(
            "task-info-priority"
          )[0].innerHTML = `<strong>Priority:</strong>${getPriorityName(
            data["task_serialized"].priority
          )}`;
          if (data["task_serialized"].completed) {
            let p = document.createElement("p");
            p.textContent = "Completed";
            document.getElementsByClassName("task-info-box")[0].appendChild(p);
          }
        }
      });
  });

  return (
    <>
      <div className="task-info-container">
        <p className="task-info-heading">Task Info</p>
        <div className="task-info-box">
          <div className="task-info-title">Title</div>
          <div className="task-info-description">Description</div>
          <div className="task-info-due-date-and-priority-container">
            <div className="task-info-due-date">Due Date</div>
            <div className="task-info-priority">Priority</div>
          </div>
        </div>
        <div className="task-info-buttons">
          <button
            className="task-info-btn"
            onClick={() => {
              props.setShowPage("update");
            }}
          >
            Update Task
          </button>
          <button className="task-info-btn" onClick={deleteTask}>
            Delete Task
          </button>
          <button
            className="task-info-btn"
            onClick={() => {
              props.setShowPage("show");
            }}
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
}
