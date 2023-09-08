import { useState, useEffect, FormEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { fetchTasks, addTask, deleteTask, toggleTask, Task } from "./api";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  useEffect(() => {
    fetchTasks()
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleAdd = () => {
    addTask({ content: newTask, done: false })
      .then(() => {
        fetchTasks().then((data) => setTasks(data));
        setNewTask("");
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const handleDelete = (taskId: number) => {
    deleteTask(taskId)
      .then(() => {
        fetchTasks().then((data) => setTasks(data));
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const handleToggle = (taskId: number, currentDoneStatus: boolean) => {
    toggleTask(taskId, currentDoneStatus)
      .then(() => {
        fetchTasks().then((data) => setTasks(data));
      })
      .catch((error) => console.error("Error toggling task:", error));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAdd();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Typography variant="h3">Todo List</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          variant="outlined"
          size="small"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          size="medium"
          aria-label="add-button"
          sx={{ ml: 1 }}
        >
          Add
        </Button>
      </form>
      <Box>
        {tasks.map((task) => (
          <Box key={task.id} sx={{ display: "flex", gap: 3 }}>
            <Checkbox
              checked={task.done}
              onClick={() => handleToggle(task.id, task.done)}
              aria-label={`toggle-button${task.id}`}
            />
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: task.done ? "line-through" : "none",
                "&:hover": {
                  textDecoration: task.done ? "line-through" : "none",
                },
              }}
            >
              {task.content}
            </Typography>
            <IconButton
              onClick={() => handleDelete(task.id)}
              aria-label={`delete-button${task.id}`}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default App;
