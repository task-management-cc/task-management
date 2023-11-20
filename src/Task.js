import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  CardActions,
  Chip,
  LinearProgress,
  Stack,
  Fab,
  Tooltip,
} from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import EventNoteIcon from "@mui/icons-material/EventNote";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Snackbar,
} from "@mui/material";
import axios from "axios";

export default function Task(props) {
  const {
    title,
    description,
    status,
    priority,
    progress,
    due_date,
    task_id,
    onEdit,
    onDelete,
  } = props;
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

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

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    // Call the delete API here
    axios
      .delete(`http://localhost:4000/tasks/${task_id}`)
      .then(() => {
        handleOpenSnackbar();
        if (onDelete) {
          onDelete();
        }
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        // Handle error
      });

    setOpenDeleteDialog(false);
  };

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleEditClick = () => {
    if (onEdit) {
      onEdit({
        title,
        description,
        status,
        priority,
        progress,
        due_date,
        task_id,
      });
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
        <Tooltip title="Edit">
          <Fab
            color="secondary"
            aria-label="edit"
            size="small"
            onClick={handleEditClick}
          >
            <EditIcon />
          </Fab>
        </Tooltip>

        <Tooltip title="Delete">
          <Fab
            color="error"
            aria-label="delete"
            size="small"
            onClick={handleDeleteClick}
          >
            <DeleteIcon />
          </Fab>
        </Tooltip>
      </CardActions>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Task successfully deleted"
      />
    </Card>
  );
}
