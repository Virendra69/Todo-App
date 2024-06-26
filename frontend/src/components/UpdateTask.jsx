import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import "../css/UpdateTask.css";

export default function UpdateTask(props) {
  const { authToken } = useContext(AuthContext);
  const [task, setTask] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: 0,
    completed: false,
  });

  // Send the updated data and update the task details
  const handleClick = (event) => {
    event.preventDefault();
    fetch(`http://127.0.0.1:8000/api/update-task/${props.taskID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${authToken}`,
      },
      body: JSON.stringify(task),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Network response was not ok!");
        }
        return response.json();
      })
      .then((data) => {
        if (data["message"] === "Task updated successfully") {
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

  // Disable all past dates and set present date as initial value of date input
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    const datePicker = document.getElementsByClassName(
      "update-task-due-date"
    )[0];
    datePicker.setAttribute("min", formattedDate);
    setTask((prev) => ({
      ...prev,
      due_date: prev.due_date ? task.due_date : formattedDate,
    }));
  }, []);

  // Handle the input values and store them in a state
  const handleChange = (event) => {
    setTask((prev) => ({
      ...prev,
      [event.target.name]:
        event.target.name === "completed"
          ? event.target.checked
          : event.target.value,
    }));
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
          setTask(() => ({
            title: data["task_serialized"].title,
            description: data["task_serialized"].description,
            due_date: data["task_serialized"].due_date,
            priority: data["task_serialized"].priority,
            completed: data["task_serialized"].completed,
          }));
        }
      });
  }, [authToken]);

  return (
    <>
      <div className="update-task-form-and-button">
        <p className="update-task-heading">Update Task</p>
        <form className="update-task-form">
          <div className="update-task-title-box">
            <label className="update-task-title-label" htmlFor="title">
              Title:
            </label>
            <input
              className="update-task-title"
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
            />
          </div>
          <div className="update-task-description-box">
            <label
              className="update-task-description-label"
              htmlFor="description"
            >
              Description:
            </label>
            <input
              className="update-task-description"
              type="text"
              name="description"
              value={task.description}
              onChange={handleChange}
            />
          </div>
          <div className="update-task-due-date-and-priority-container">
            <div className="update-task-due-date-box">
              <label className="update-task-due-date-label" htmlFor="due_date">
                Due Date:
              </label>
              <input
                className="update-task-due-date"
                type="date"
                name="due_date"
                value={task.due_date}
                onChange={handleChange}
              />
            </div>
            <div className="update-task-priority-box">
              <label className="update-task-priority-label" htmlFor="priority">
                Priority:
              </label>
              <select
                className="update-task-priority"
                name="priority"
                value={task.priority}
                onChange={handleChange}
              >
                <option value={1}>Low</option>
                <option value={2}>Medium</option>
                <option value={3}>High</option>
              </select>
            </div>
          </div>
          <div className="update-task-status-box">
            <label className="update-task-status-label" htmlFor="checkbox">
              Is Completed?
            </label>
            <input
              className="update-task-status"
              type="checkbox"
              name="completed"
              checked={task.completed}
              onChange={handleChange}
            />
          </div>
        </form>
        <div className="update-task-buttons">
          <button className="update-task-btn" onClick={handleClick}>
            Save
          </button>
          <button
            className="update-task-btn"
            onClick={() => {
              props.setShowPage("show");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
