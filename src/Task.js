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
    dueDate,
    onEdit,
    onDelete,
  } = props;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 1:
        return "error";
      case 2:
        return "warning";
      case 3:
        return "success";
      default:
        return "default";
    }
  };

  const getCardStyle = (status) => {
    switch (status) {
      case 1:
        return { backgroundColor: "#e0e0e0", color: "#000" }; // Grey for yet to start
      case 2:
        return { backgroundColor: "#ffecb3", color: "#000" }; // Yellow for in progress
      case 3:
        return { backgroundColor: "#c8e6c9", color: "#000" }; // Green for completed
      default:
        return { backgroundColor: "#fff", color: "#000" }; // Default white
    }
  };

  const getStatusText = (statusNumber) => {
    switch (statusNumber) {
      case 1:
        return "Yet to Start";
      case 2:
        return "In Progress";
      case 3:
        return "Completed";
      default:
        return "Unknown Status";
    }
  };

  // Function to map priority number to text
  const getPriorityText = (priorityNumber) => {
    switch (priorityNumber) {
      case 1:
        return "High";
      case 2:
        return "Medium";
      case 3:
        return "Low";
      default:
        return "Unknown Priority";
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
          <Chip label={`Status: ${getStatusText(status)}`} color="primary" />
          <Chip
            icon={<PriorityHighIcon />}
            label={`Priority: ${getPriorityText(priority)}`}
            color={getPriorityColor(priority)}
          />
        </Stack>
        <Typography
          variant="body2"
          color="text.primary"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <EventNoteIcon />
          Due Date: {dueDate}
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
