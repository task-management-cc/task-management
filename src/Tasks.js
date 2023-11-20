import React from "react";
import { Paper, Grid } from "@mui/material";
import Task from "./Task";

function Tasks({ tasks, onDelete, onEdit }) {
  if (!tasks || tasks.length === 0) {
    return <p>No tasks available</p>; // Check if tasks array is empty or undefined
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", padding: 2 }}>
      <Grid container spacing={2}>
        {tasks.map((task, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Task
              title={task.title}
              description={task.description}
              status={task.status}
              priority={task.priority}
              progress={task.progress}
              due_date={task.due_date ? task.due_date.split("T")[0] : ""}
              task_id={task.task_id}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default Tasks;
