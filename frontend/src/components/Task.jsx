import React, { useState } from "react";
import "../css/Task.css";

export default function Task(props) {
  const [checkBoxVal, setCheckBoxVal] = useState("")
  const getColor = (priority) => {
    if (priority === 1) {
      return "green";
    }
    if (priority === 2) {
      return "yellow";
    }
    if (priority === 3) {
      return "red";
    }
  };

  return (
    <div
      className="task-slide"
      onClick={() => {
        props.setTaskID(props.id);
        props.setShowPage("info");
      }}
    >
      <p className="title">{props.title}</p>
      {/* <p className="due-date">Due: {props.due_date}</p> */}
      <p
        className="priority"
        style={{
          backgroundColor: getColor(props.priority),
        }}
      ></p>
    </div>
  );
}
