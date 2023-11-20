import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActions, Chip, LinearProgress, Stack, Fab } from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import EventNoteIcon from "@mui/icons-material/EventNote";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Task(props) {
  const {
    title,
    description,
    status,
    priority,
    progress,
    due_date,
    onEdit,
    onDelete,
  } = props;

  // Function to get color based on priority
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "default";
    }
  };

  const getCardStyle = (status) => {
    switch (status.toLowerCase()) {
      case "yet to start":
        return { backgroundColor: "#e0e0e0", color: "#000" }; // Grey for yet to start
      case "in progress":
        return { backgroundColor: "#ffecb3", color: "#000" }; // Yellow for in progress
      case "completed":
        return { backgroundColor: "#c8e6c9", color: "#000" }; // Green for completed
      default:
        return { backgroundColor: "#fff", color: "#000" }; // Default white
    }
  };

  return (
    <Card
      sx={{ maxWidth: 345, margin: 2, boxShadow: 3, ...getCardStyle(status) }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ marginY: 2 }}
        >
          <Chip label={`Status: ${status}`} color="primary" />
          <Chip
            icon={<PriorityHighIcon />}
            label={`Priority: ${priority}`}
            color={getPriorityColor(priority)}
          />
        </Stack>
        <Typography
          variant="body2"
          color="text.primary"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <EventNoteIcon />
          Due Date: {due_date}
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ marginTop: 2 }}>
          Progress:
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 10, borderRadius: 5, marginBottom: 2 }}
        />
      </CardContent>
      <CardActions>
        <Fab color="secondary" aria-label="edit" size="small" onClick={onEdit}>
          <EditIcon />
        </Fab>

        <Fab color="error" aria-label="delete" size="small" onClick={onDelete}>
          <DeleteIcon />
        </Fab>
      </CardActions>
    </Card>
  );
}
