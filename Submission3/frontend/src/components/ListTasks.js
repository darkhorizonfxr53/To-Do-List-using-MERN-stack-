
// // import necessary modules
// import React from "react";
// import { Button, Form } from "react-bootstrap";

// // functional component using arrow function syntax that receives props from App.js
// const ListTasks = ({
//   tasks,
//   handleDeleteTask,
//   handleEditTask,
//   handleToggleTask,
// }) => {
//   // if the task list is empty and return only the heading
//   if (!tasks || tasks.length === 0) {
//     return <h2>Task List</h2>;
//   }

//   return (
//     // renders a List
//     <div>
//       <h2>Task List</h2>
//       <ul>
//         {/* maps through tasks array and renders a list item*/}
//         {tasks.map((task) => (
//           <li key={task._id}>
//             <div style={{ display: "flex", alignItems: "center" }}>
//               <Form.Check
//                 type="checkbox"
//                 checked={task.completed}
//                 // handles the change of competion of a task
//                 onChange={() => handleToggleTask(task._id)}
//               />

//               <h4 style={{ marginLeft: "20px", marginRight: "100px" }}>
//                 {task.content}
//               </h4>
//               {/* handles the editing of a task*/}
//               <Button
//                 onClick={() => handleEditTask(task._id)}
//                 style={{ marginRight: "15px" }}
//               >
//                 Edit
//               </Button>
//               {/* handles the deletion of a task*/}
//               <Button onClick={() => handleDeleteTask(task._id)}>Delete</Button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// // export the component
// export default ListTasks;
// import necessary modules
import React from "react";
import { Button, Form } from "react-bootstrap";

// functional component using arrow function syntax that receives props from App.js
const ListTasks = ({
  tasks,
  handleDeleteTask,
  handleEditTask,
  handleToggleTask,
}) => {
  return (
    // renders a List
    <div>
      <h2>Task List</h2>
      <ul>
        {/* Use ternary operator to check if tasks has value */}
        {tasks && tasks.length > 0 ? (
          // maps through tasks array and renders a list item
          tasks.map((task) => (
            <li key={task._id}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Form.Check
                  type="checkbox"
                  checked={task.completed}
                  // handles the change of completion of a task
                  onChange={() => handleToggleTask(task._id)}
                />

                <h4 style={{ marginLeft: "20px", marginRight: "100px" }}>
                  {task.content}
                </h4>
                {/* handles the editing of a task*/}
                <Button
                  onClick={() => handleEditTask(task._id)}
                  style={{ marginRight: "15px" }}
                >
                  Edit
                </Button>
                {/* handles the deletion of a task*/}
                <Button onClick={() => handleDeleteTask(task._id)}>Delete</Button>
              </div>
            </li>
          ))
        ) : (
          // Render a message or an empty list if tasks is undefined or empty
          <li>No tasks available</li>
        )}
      </ul>
    </div>
  );
};

// export the component
export default ListTasks;