import React, { useState, useEffect } from "react";
import axios from "axios";
import Tasks from "./Tasks";
import CreateTask from "./CreateTask";

function TaskManager({ uid }) {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  const handleEditTask = (task) => {
    setEditTask(task); // Set the task to be edited
  };

  const fetchTasks = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const url = apiUrl + `/tasks?uid=${uid}`;
    axios
      .get(url)
      .then((response) => {
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
    setEditTask(null);
  };

  return (
    <div>
      {editTask ? (
        <CreateTask
          onTaskCreated={handleTaskUpdate}
          uid={uid}
          task={editTask}
          isEditMode={true}
        />
      ) : (
        <>
          <CreateTask onTaskCreated={fetchTasks} uid={uid} />
          <Tasks
            tasks={tasks}
            onDelete={handleTaskUpdate}
            onEdit={handleEditTask}
            onTaskUpdated={handleTaskUpdate}
          />
        </>
      )}
    </div>
  );
}

export default TaskManager;
