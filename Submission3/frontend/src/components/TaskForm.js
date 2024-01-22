/* This React functional child component that represents a form for adding a task or editing a task. */

// import necessary modules
import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

// functional component using arrow function syntax that receives props from App.js
const TaskForm = ({ addTask, initialTitle = "", onCancel }) => {
  // for editing a task the state is set the initialTitle prop
  const [title, setTitle] = useState(initialTitle);
  // this state is based on wheter the initialTitle prop is provided or not
  const [isEditMode, setIsEditMode] = useState(initialTitle !== "");

  // updates the title and isEditMode accordingly
  useEffect(() => {
    // when initialTitle changes the hook updates the title state to match the initial state
    setTitle(initialTitle);
    // sets the edit mode to true if the initialTitle is not an empty string
    setIsEditMode(initialTitle !== "");
  }, [initialTitle]);

  // handles the submission of the form
  const handleSubmit = (e) => {
    // prevents the default
    e.preventDefault();
    // checks if the title is not empty after trimming any whitespace and calls the addTask function
    if (title.trim() !== "") {
      addTask(title);
      // sets the input value to empty
      setTitle("");
      // sets the edit mode to false
      setIsEditMode(false);
    }
  };

  // if the task is being edited -> set to true - the Edit Task form is renderd with two buttons edit and cancel
  if (isEditMode) {
    return (
      // renders a form
      <div className="container1">
        <div>
          <h2>Edit Task</h2>
          <Form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              value={title}
              // updates the title state
              onChange={(e) => setTitle(e.target.value)}
            />
            {/* handles the submit */}
            <Button type="submit" className="btn btn-primary">
              Update Task
            </Button>
            {/* handles the cancel */}
            <Button className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </Button>
          </Form>
        </div>
      </div>
    );
  }

  // if a task is not being edited then the default state is the Add Task form
  return (
    // renders a form
    <div>
      <h2>Add Task</h2>
      <Form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          value={title}
          // updates the title state
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* handles the submit */}
        <Button type="submit" className="btn btn-primary">
          Add Task
        </Button>
      </Form>
    </div>
  );
};

// export the component
export default TaskForm;
