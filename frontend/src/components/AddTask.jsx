import React, { useContext, useEffect, useState } from "react";
import "../css/AddTask.css";
import { AuthContext } from "./AuthContext";

export default function AddTask(props) {
  const { authToken } = useContext(AuthContext);
  const [task, setTask] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: "1",
  });

  // Send data and create a new task
  const handleClick = (event) => {
    event.preventDefault();
    fetch("http://127.0.0.1:8000/api/create-task/", {
      method: "POST",
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
        if (data["message"] === "Task created successfully") {
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

  // Go back to the page that shows all tasks
  const goBack = (event) => {
    props.setShowPage("show");
  };

  // Disable all past dates and set present date as initial value of date input
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    const datePicker = document.getElementsByClassName("add-task-due-date")[0];
    datePicker.setAttribute("min", formattedDate);
    setTask((prev) => ({
      ...prev,
      due_date: prev.due_date ? task.due_date : formattedDate,
    }));
  }, []);

  // Handle the inputs and store them in a state
  const handleChange = (event) => {
    setTask((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  // Enable the submit button only when the required fields are filled
  useEffect(() => {
    if (
      task.title.length > 0 &&
      task.due_date.length > 0 &&
      task.priority.length > 0
    ) {
      document.getElementsByClassName("add-task-btn")[0].disabled = false;
    } else {
      document.getElementsByClassName("add-task-btn")[0].disabled = true;
    }
  }, [task]);

  return (
    <>
      <div className="add-task-form-and-button">
        <p className="add-task-heading">Add Task</p>
        <form className="add-task-form">
          <div className="add-task-title-box">
            <label className="add-task-title-label" htmlFor="title">
              Title:
            </label>
            <input
              className="add-task-title"
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="add-task-description-box">
            <label className="add-task-description-label" htmlFor="description">
              Description:
            </label>
            <input
              className="add-task-description"
              type="text"
              name="description"
              value={task.description}
              onChange={handleChange}
            />
          </div>
          <div className="add-task-due-date-and-priority-container">
            <div className="add-task-due-date-box">
              <label className="add-task-due-date-label" htmlFor="due_date">
                Due Date:
              </label>
              <input
                className="add-task-due-date"
                type="date"
                name="due_date"
                value={task.due_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-task-priority-box">
              <label className="add-task-priority-label" htmlFor="priority">
                Priority:
              </label>
              <select
                className="add-task-priority"
                name="priority"
                value={task.priority}
                onChange={handleChange}
                required
              >
                <option value={1}>Low</option>
                <option value={2}>Medium</option>
                <option value={3}>High</option>
              </select>
            </div>
          </div>
        </form>
        <div className="add-task-buttons">
          <button className="add-task-btn" onClick={handleClick}>
            Add Task
          </button>
          <button className="add-task-btn" onClick={goBack}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
