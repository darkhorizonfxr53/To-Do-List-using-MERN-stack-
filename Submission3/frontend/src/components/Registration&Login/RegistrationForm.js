/*
PLEASE IGNORE THIS CODE. THIS IS FOR EDUCATIONAL PURPOSES!!!
import React, (useState), axios , etc...

//Create the login function
initalize the username and password variables

const [ username, setUsername ] = useState("")
const [password, setPassword] = useState

//handle user registration
const handleRegister = async () ... => {
    try{
        await axios.post("http....")
    } method: "POST"
    Headers: "Authorization"
    content: "application/json"
    ...
} catch error(){
    console.error
}
}

const handleLogin = async () ... => {
    try{
        something like handleRegister
    }
    naviage ("/todos")
}

//The return statment look something like:
return(
    <form onSubmit = {handleRegister}>
        <input
            type= "text",
            value={username}
            onChange{(e) => setUsername(e.target.value)}   onChange (means youre changing value, & setting the state of it.)  (e) is the event handler
)
*/
// AuthForms.js
import React, {useState } from "react"
import {Button, Form } from "react-bootstrap"
export const Register = ({ handleRegister }) => {
  //manages state of username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //handles form submission
  const handleSubmit = (e) => {
//prevents default action
    e.preventDefault();
    //calls the function with arguments username and password
    handleRegister(username, password);
    //resets to to first values
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h2 className="h2">Register</h2>
      <Form className="register" onSubmit={handleSubmit}>
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
          Register
        </Button>
      </Form>
    </div>
  );
};
//export Register
export default Register