import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
//functional component that uses arrow syntax, getting props from elsewhere
const Login = ({ handleLogin }) => {
  //Manages the state of the usrename and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
//Handles the submission of the form
  const handleSubmit = (e) => {
    //prevents the default
    e.preventDefault();
    //calls the function with the arguments: username and password
    handleLogin(username, password);
  };

  return (
    <div>
      <h2 className="h2">Login</h2>
      <Form className="login" onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          className="form-control"
          value={username}
          //updates username state
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          className="form-control"
          value={password}
                    //updates password state
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          className="btn btn-primary"
          type="submit"
          style={{ marginTop: "12px" }}
        >
          Login
        </Button>
      </Form>
    </div>
  );
};
//export the component
export default Login;
