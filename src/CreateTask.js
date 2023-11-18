import * as React from "react";
import {
  Button,
  Box,
  TextField,
  Typography,
  Stack,
  Select,
  MenuItem,
  Slider,
  InputLabel,
  FormControl,
  IconButton,
  Dialog,
  DialogContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

export default function CreateTask({ onTaskCreated, email }) {
  console.log(email);
  const [open, setOpen] = React.useState(false);
  const [taskData, setTaskData] = React.useState({
    title: "",
    description: "",
    status: 0,
    priority: 0,
    progress: 0,
    dueDate: "",
    email: email,
  });
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStatusChange = (event) => {
    setTaskData({ ...taskData, status: event.target.value });
  };

  const handlePriorityChange = (event) => {
    setTaskData({ ...taskData, priority: event.target.value });
  };
  const handleInputChange = (event) => {
    setTaskData({ ...taskData, [event.target.name]: event.target.value });
  };

  const handleProgressChange = (event) => {
    setTaskData({ ...taskData, progress: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(taskData);
      await axios.post("http://localhost:4000/tasks", taskData);
      handleClose();
      // Optionally reset form or provide user feedback
      setTaskData({
        title: "",
        description: "",
        status: "",
        priority: "",
        progress: 0,
        dueDate: "",
        email: email,
      });
      if (onTaskCreated) {
        onTaskCreated();
      }
    } catch (error) {
      console.error("Error creating task:", error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={handleClickOpen("body")}
      >
        Create Task
      </Button>
      <Dialog
        open={open}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        disableEscapeKeyDown
        fullWidth={true}
        maxWidth={"md"}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleClose(event, reason);
          }
        }}
      >
        <DialogContent dividers={scroll === "paper"}>
          <Box>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>
            <Typography id="create-task-modal" variant="h6" component="h2">
              Create New Task
            </Typography>
            <form id="create-task-form" onSubmit={handleSubmit}>
              <Stack spacing={2} marginTop={2}>
                <TextField
                  label="Title"
                  name="title"
                  variant="outlined"
                  fullWidth
                  value={taskData.title}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Description"
                  name="description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={taskData.description}
                  onChange={handleInputChange}
                />
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={taskData.status}
                    label="Status"
                    onChange={handleStatusChange}
                  >
                    <MenuItem value={1}>Yet to Start</MenuItem>
                    <MenuItem value={2}>In Progress</MenuItem>
                    <MenuItem value={3}>Completed</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={taskData.priority}
                    label="Priority"
                    onChange={handlePriorityChange}
                  >
                    <MenuItem value={1}>High</MenuItem>
                    <MenuItem value={2}>Medium</MenuItem>
                    <MenuItem value={3}>Low</MenuItem>
                  </Select>
                </FormControl>

                {/* Progress Slider */}
                <Typography gutterBottom>Progress</Typography>
                <Slider
                  value={taskData.progress}
                  onChange={handleProgressChange}
                  aria-labelledby="progress-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                />

                <TextField
                  label="Due Date"
                  name="dueDate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={taskData.dueDate}
                  onChange={handleInputChange}
                />
                <Button variant="contained" color="primary" type="submit">
                  Create Task
                </Button>
              </Stack>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
