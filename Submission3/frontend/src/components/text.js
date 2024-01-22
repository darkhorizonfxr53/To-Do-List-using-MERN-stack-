// PLEASE IGNORE THIS CODE. THIS IS FOR EDUCATIONAL PURPOSES!!!


// import React, { useState, useEffect } from "react";
// import { Button } from "react-bootstrap";
// import TaskList from "./components/TaskList";
// import TaskForm from "./components/TaskForm";
// import ChangePassword from "./components/ChangePassword";
// import "./App.css";

// const App = () => {
//   // ... (existing code)

//   const Login = ({ handleLogin }) => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");

//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//         const response = await fetch("http://localhost:8080/users/login", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ username, password }),
//         });

//         if (response.ok) {
//           const data = await response.json();
//           localStorage.setItem("token", data.token);
//           setIsLoggedIn(true);
//         } else {
//           const errorData = await response.json();
//           console.error("Login failed:", errorData.message);
//           alert("Login failed: Invalid username or password");
//         }
//       } catch (error) {
//         console.error("Error logging in:", error);
//         alert("Login forbidden: Username has to end with '@gmail.com'.");
//       }
//     };

//     return (
//       <div>
//         <h2 className="h2">Login</h2>
//         {/* ... (existing login form code) */}
//         <Button
//           className="btn btn-primary"
//           type="submit"
//           style={{ marginTop: "12px" }}
//           onClick={handleSubmit}
//         >
//           Login
//         </Button>
//       </div>
//     );
//   };

//   const Register = ({ handleRegister }) => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");

//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//         const response = await fetch("http://localhost:8080/users/register", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ username, password }),
//         });

//         if (response.status === 200) {
//           alert("User registered successfully.");
//           setIsRegistered(true);
//         } else if (response.status === 400) {
//           const data = await response.json();
//           console.log("Registration failed:", data.error);
//           alert("Registration failed!");
//         } else if (response.status === 403) {
//           console.log("Registration forbidden: User not allowed.");
//           alert("Registration forbidden: Username has to end with '@gmail.com'.");
//         } else {
//           console.log("Registration failed with status:", response.status);
//           alert("Username already exists!");
//         }
//       } catch (error) {
//         console.error("Error during registration:", error.message);
//       }
//     };

//     return (
//       <div>
//         <h2 className="h2">Register</h2>
//         {/* ... (existing registration form code) */}
//         <Button
//           className="btn btn-primary"
//           type="submit"
//           style={{ marginTop: "12px" }}
//           onClick={handleSubmit}
//         >
//           Register
//         </Button>
//       </div>
//     );
//   };

//   // ... (existing code)

//   return (
//     <div>
//       <h1>To-Do List App</h1>
//       {/* ... (existing code) */}
//       {isRegistered ? (
//         <>
//           {isLoggedIn ? (
//             <>
//               {/* ... (existing code) */}
//             </>
//           ) : (
//             <>
//               <div className="container">
//                 <Login handleLogin={handleLogin} />
//               </div>
//               <Button
//                 style={{ position: "absolute", top: "15px", right: "20px" }}
//                 onClick={() => setIsRegistered(false)}
//               >
//                 Register
//               </Button>
//             </>
//           )}
//         </>
//       ) : (
//         <>
//           <div className="container">
//             <Register handleRegister={handleRegister} />
//           </div>
//           <Button
//             style={{ position: "absolute", top: "15px", right: "20px" }}
//             onClick={() => setIsRegistered(true)}
//           >
//             Login
//           </Button>
//         </>
//       )}
//     </div>
//   );
// };

// export default App;
// 

/*
// import React, { useState, useEffect } from "react";
// import { Button } from "react-bootstrap";
// import TaskList from "./components/TaskList";
// import TaskForm from "./components/TaskForm";
// import ChangePassword from "./components/ChangePassword";
// import "./App.css";

// const App = () => {
//   // ... (existing code)

//   const Login = ({ handleLogin }) => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");

//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//         const response = await fetch("http://localhost:8080/users/login", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ username, password }),
//         });

//         if (response.ok) {
//           const data = await response.json();
//           localStorage.setItem("token", data.token);
//           setIsLoggedIn(true);
//         } else {
//           const errorData = await response.json();
//           console.error("Login failed:", errorData.message);
//           alert("Login failed: Invalid username or password");
//         }
//       } catch (error) {
//         console.error("Error logging in:", error);
//         alert("Login forbidden: Username has to end with '@gmail.com'.");
//       }
//     };

//     return (
//       <div>
//         <h2 className="h2">Login</h2>
//         {/* ... (existing login form code) *///}
//         <Button
//           className="btn btn-primary"
//           type="submit"
//           style={{ marginTop: "12px" }}
//           onClick={handleSubmit}
//         >
//           Login
//         </Button>
//       </div>
//     );
//   };

//   const Register = ({ handleRegister }) => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");

//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//         const response = await fetch("http://localhost:8080/users/register", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ username, password }),
//         });

//         if (response.status === 200) {
//           alert("User registered successfully.");
//           setIsRegistered(true);
//         } else if (response.status === 400) {
//           const data = await response.json();
//           console.log("Registration failed:", data.error);
//           alert("Registration failed!");
//         } else if (response.status === 403) {
//           console.log("Registration forbidden: User not allowed.");
//           alert("Registration forbidden: Username has to end with '@gmail.com'.");
//         } else {
//           console.log("Registration failed with status:", response.status);
//           alert("Username already exists!");
//         }
//       } catch (error) {
//         console.error("Error during registration:", error.message);
//       }
//     };

//     return (
//       <div>
//         <h2 className="h2">Register</h2>
//         {/* ... (existing registration form code) */}
//         <Button
//           className="btn btn-primary"
//           type="submit"
//           style={{ marginTop: "12px" }}
//           onClick={handleSubmit}
//         >
//           Register
//         </Button>
//       </div>
//     );
//   };

//   // ... (existing code)

//   return (
//     <div>
//       <h1>To-Do List App</h1>
//       {/* ... (existing code) */}
//       {isRegistered ? (
//         <>
//           {isLoggedIn ? (
//             <>
//               {/* ... (existing code) */}
//             </>
//           ) : (
//             <>
//               <div className="container">
//                 <Login handleLogin={handleLogin} />
//               </div>
//               <Button
//                 style={{ position: "absolute", top: "15px", right: "20px" }}
//                 onClick={() => setIsRegistered(false)}
//               >
//                 Register
//               </Button>
//             </>
//           )}
//         </>
//       ) : (
//         <>
//           <div className="container">
//             <Register handleRegister={handleRegister} />
//           </div>
//           <Button
//             style={{ position: "absolute", top: "15px", right: "20px" }}
//             onClick={() => setIsRegistered(true)}
//           >
//             Login
//           </Button>
//         </>
//       )}
//     </div>
//   );
// };

// export default App;
