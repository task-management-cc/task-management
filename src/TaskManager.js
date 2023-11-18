import React, { useState, useEffect } from "react";
import axios from "axios";
import Tasks from "./Tasks";
import CreateTask from "./CreateTask";

function TaskManager({ email }) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    const url = `http://localhost:4000/tasks?email=${encodeURIComponent(
      email
    )}`;
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setTasks(response.data);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  };
  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, []);

  const handleTaskUpdate = () => {
    fetchTasks();
  };

  return (
    <div>
      <CreateTask onTaskCreated={handleTaskUpdate} email={email} />
      <Tasks tasks={tasks} />
    </div>
  );
}

export default TaskManager;
