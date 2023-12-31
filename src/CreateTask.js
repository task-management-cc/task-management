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

export default function CreateTask({
  onTaskCreated,
  uid,
  task = null,
  isEditMode = false,
}) {
  const [open, setOpen] = React.useState(false);
  const [taskData, setTaskData] = React.useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    progress: 0,
    due_date: "",
    uid: uid,
  });

  React.useEffect(() => {
    if (isEditMode && task) {
      setTaskData({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        progress: task.progress,
        due_date: task.due_date ? task.due_date.split("T")[0] : "",
        uid: uid,
      });
      setOpen(true); // Open the dialog in edit mode
    }
  }, [task, isEditMode, uid]);

  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
    if (!isEditMode) {
      setTaskData({
        title: "",
        description: "",
        status: "",
        priority: "",
        progress: 0,
        due_date: "",
        uid: uid,
      });
    }
    if (onTaskCreated) {
      onTaskCreated();
    }
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
      const apiUrl = process.env.REACT_APP_API_URL;
      const url = isEditMode
        ? apiUrl + `/tasks/${task.task_id}`
        : apiUrl + "/tasks";
      const method = isEditMode ? axios.put : axios.post;
      await method(url, taskData);

      setTaskData({
        title: "",
        description: "",
        status: 0,
        priority: 0,
        progress: 0,
        due_date: "",
        uid: uid,
      });
      handleClose();
      if (onTaskCreated) {
        onTaskCreated();
      }
    } catch (error) {
      console.error(
        "Error:",
        isEditMode ? "updating" : "creating",
        "task:",
        error
      );
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
              {isEditMode ? "Update Task" : "Create New Task"}
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
                  required
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
                <FormControl fullWidth required>
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
                <FormControl fullWidth required>
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

                <Typography gutterBottom>Progress</Typography>
                <Slider
                  value={taskData.progress}
                  onChange={handleProgressChange}
                  aria-labelledby="progress-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                  required
                />

                <TextField
                  label="Due Date"
                  name="due_date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={taskData.due_date}
                  onChange={handleInputChange}
                />
                <Button variant="contained" color="primary" type="submit">
                  {isEditMode ? "Update Task" : "Create Task"}
                </Button>
              </Stack>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
