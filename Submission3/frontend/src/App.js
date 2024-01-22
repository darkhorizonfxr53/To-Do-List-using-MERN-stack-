/* The Parent component manages the state of the application, handles user registration and login,
and interacts with the server*/

// import necessary modules
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
//import {useNavigate} from "react-router-dom"
import ListTasks from "./components/ListTasks";
import TaskForm from "./components/TaskForm";
import Login from "./components/Registration&Login/LoginForm";
import Register from "./components/Registration&Login/RegistrationForm";
import axios from "axios"

// functional component using arrow function syntax
const App = () => {
  // manages the state of logged in or not -> initial state is false
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // manages the state of registered or not -> initial state is false
  const [isRegistered, setIsRegistered] = useState(false);
  // manages the state of the tasks
  const [tasks, setTasks] = useState([]);
  // manages the state of the task being edited
  const [editTask, setEditTask] = useState(null);
  //const navigate = useNavigate("")

  // asynchronous function that handles the registration submission - has two parameters
  const handleRegister = async (username, password) => {
    try {
      // sends a POST request to the API with the username and password in the body request
      const response = await axios.post("http://localhost:3001/user/register", {
        username,
        password,
        }, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // if the response was OK
      if (response.status === 200) {
        // alert the user
        alert("User registered successfully.");
        // Update the state to indicate successful registration
        setIsRegistered(true);
        // if the response was a Bad Request
      } else if (response.status === 400) {
        const data = await response.json();
        // log  the error
        console.log("Registration failed:", data.error);
        // alert the user
        alert("Registration failed!");
        // if the response code was Forbidden
      } else if (response.status === 403) {
        // log  the error
        console.log("Registration forbidden: User not allowed.");
        // alert the user
        alert("Registration forbidden: Username has to end with '@gmail.com'.");
      } else {
        // log the error
        console.log("Registration failed with status:", response.status);
        // alert the user
        alert("Username already exists!");
      }
    } catch (error) {
      // log the error
      console.error("Error during registration:", error.message);
    }
  };

  // asynchronous function that handles the login submission - has two parameters
  const handleLogin = async (username, password) => {
    try {
      // sends a POST request to the API with the username and password in the body request
      const response = await fetch("http://localhost:3001/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // if the response was OK
      if (response.ok) {
        const data = await response.json();
        // saves the authentication token in local storage
        localStorage.setItem("token", data.token);
        // sets the logged in state to true -> displays the logged in view
        setIsLoggedIn(true);
        //navigate("/tasks")
      } else {
        // if there was an error
        const errorData = await response.json();
        // log the error
        console.error("Login failed:", errorData.message);
        // alert the user
        alert("Login failed: Invalid username or password");
      }
      // if there was an error
    } catch (error) {
      // log the error
      console.error("Error logging in:", error);
      // // alert the user
      // alert("Login forbidden: Username has to end with '@gmail.com'.");
    }
  };

  useEffect(() => {
    const checkRegistrationStatus = () => {
      // retrieves the token value
      const token = localStorage.getItem("token");
      // shorthand way of of converting the token value to a boolean
      // if the token is true (not empty) the status is evaluated to true and vice versa
      setIsRegistered(!!token);
    };
    // function is called
    checkRegistrationStatus();
  }, []);

  // only fetch the tasks once the user has logged in
  useEffect(() => {
    // if the user is logged in
    if (isLoggedIn) {
      // asynchronous function that handles the fetching of tasks
      const fetchTasks = async () => {
        try {
          // retrive token from storage
          const token = localStorage.getItem("token");

          // GET request to API along with the token to authorise user
          const response = await fetch("http://localhost:3001/todos/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // convert the data
          const data = await response.json();
          // if there are tasks set the state to the data
          setTasks(data);
        } catch (error) {
          // log the error
          console.error("Error fetching tasks:", error);
        }
      };
      // function is called
      fetchTasks();
    }
  }, [isLoggedIn]);

  // asynchronous function that handles the adding of tasks - has one parameters
  const addTask = async (content) => {
    try {
      // get token
      const token = localStorage.getItem("token");

      // sends POST request to APT with token and task in the request body
      const response = await fetch("http://localhost:3001/todos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      // if the response was a Bad request
      if (response.status === 400) {
        // alert the user
        alert("Task exceeds 140 character limit!");
        // if the status was Unsupported Media Type
      } else if (response.status === 415) {
        // alert the user
        alert("Input is not JSON content!");
        // if the status was an Internal Server Error
      } else if (response.status === 500) {
        // alert the user
        alert("Error adding task");
      }

      // if the response was ok
      if (response.ok) {
        const newTask = await response.json();
        // updates the tasks state with the new task
        setTasks((prevTasks) => [...prevTasks, newTask]);
      } else {
        throw new Error("Error adding task");
      }
    } catch (error) {
      // log the error
      console.error("Error adding task:", error);
    }
  };

  // asynchronous function that handles the deletion of a task - has one parameters
  const handleDeleteTask = async (taskId) => {
    try {
      // sends DELETE request to API with the task ID
      await fetch(`/tasks/${taskId}`, {
        method: "DELETE",
      });
      // updates the tasks sate by filtering out the deleted task
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  // function that handles the selceted task to be edited - has one parameter
  const handleEditTask = (taskId) => {
    // searches for the task in the array that maches the given taskId
    const taskToEdit = tasks.find((task) => task._id === taskId);
    // sets the state to the task that matches the given taskId
    if (taskToEdit) {
      setEditTask(taskToEdit);
    }
  };

  // cancels the editing of a task by resetting the Edit state to null
  const handleCancelEdit = () => {
    setEditTask(null);
  };

  // asynchronous function that handles the updating of a task with the edited information - has one parameter
  const handleUpdateTask = async (updatedContent) => {
    try {
      // Destructures the _id property from the editTask object into a variable taskId.
      const { _id: taskId } = editTask;
      // sends PUT request to API with task ID and updated information in the request body
      const response = await fetch(`http://localhost:3001/todos/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: updatedContent,
          completed: editTask.completed,
        }),
      });
      // response is store in the updatedTask variable
      const updatedTask = await response.json();
      // updates the state by mapping over the array and replacing the task with the matching ID with the update
      setTasks(tasks.map((task) => (task._id === taskId ? updatedTask : task)));
      // sets it back to null so that the add task form is displayed
      setEditTask(null);
    } catch (error) {
      // log the error
      console.error("Error updating task:", error);
    }
  };

  // asynchronous function that handles the toggle of a checkbox and completed status - has one parameter
  const handleToggleTask = async (taskId) => {
    try {
      // creates a new array by mapping over the tasks array and toggling the status of the task
      const updatedTasks = tasks.map(
        (task) =>
          // for each task in the arry it checks if the id property matches the taskId parameter
          task._id === taskId ? { ...task, completed: !task.completed } : task
        // if they match it creates a new object using the spread operator if not it returns the original task
      );

      // updates the task state by calling the setTasks function and passing the new array as the state
      setTasks(updatedTasks);

      // sends a PUT request to the API with the taskId
      await fetch(`http://localhost:3001/todos/${taskId}/toggle`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // contains the updated completed status in the request body
        body: JSON.stringify(updatedTasks.find((task) => task._id === taskId)),
      });
    } catch (err) {
      // logs the error
      console.error(err);
    }
  };

  // function to allow the user to logout
  const handleLogout = () => {
    // set logged in to false
    setIsLoggedIn(false);
    // clear the token form the storage
    localStorage.removeItem("token");
  };

  return (
    <div>
      <h1>To-Do List App</h1>

      {/* if user is registered, display the login page */}
      {isRegistered ? (
        <>
          {isLoggedIn ? ( // Check if user is already logged in
            <>
              {/* Button to handle logout */}
              <Button
                style={{ position: "absolute", top: "15px", right: "20px" }}
                onClick={handleLogout}
              >
                Logout
              </Button>
              {editTask ? (
                /* pass props down */
                <TaskForm
                  addTask={handleUpdateTask}
                  initialContent={editTask.content}
                  onCancel={handleCancelEdit}
                />
              ) : (
                /* pass props down */
                <TaskForm addTask={addTask} />
              )}
              {/* pass props down */}
              <ListTasks
                tasks={tasks}
                handleDeleteTask={handleDeleteTask}
                handleEditTask={handleEditTask}
                handleToggleTask={handleToggleTask}
              />
              
            </>
          ) : (
            // if user is registered, display the login page
            <>
              <div className="container">
                {/* pass prop down */}
                <Login handleLogin={handleLogin} />
              </div>
              {/* handles the change of forms */}
              <Button
                style={{ position: "absolute", top: "15px", right: "20px" }}
                onClick={() => setIsRegistered(false)}
              >
                Register
              </Button>
            </>
          )}
        </>
      ) : (
        // if user is not registered, display the registration page
        <>
          <div className="container">
            {/* passes prop down */}
            <Register handleRegister={handleRegister} />
          </div>
          {/* handles the change of forms */}
          <Button
            style={{ position: "absolute", top: "15px", right: "20px" }}
            onClick={() => setIsRegistered(true)}
          >
            Login
          </Button>
        </>
      )}
    </div>
  );
};

// export the component
export default App;
