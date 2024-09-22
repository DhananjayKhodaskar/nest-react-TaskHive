import React, { useEffect, useState } from "react";
import {
  Box,

  Typography,
  Grid2 as Grid,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createToDo,
  deleteToDo,
  getToDos,
  updateToDo,
} from "./slices.jsx/todoSlice";
import { getUserDetails } from "./slices.jsx/userSlice";
import CircularProgress from "@mui/material/CircularProgress";
import TopBar from "./Components/Sidebar";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";

const ToDoPage = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);
  const [input, setInput] = useState("");
  const { roles } = useSelector((state) => state.user?.user);
  const readOnlyPermission = roles[0] !== "Admin";
  const [addLoading, setAddLoading] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState("");

  const handleCreateToDo = (task) => {
    setAddLoading(true);
    setInput("");
    dispatch(createToDo({ task: task, completed: false }))
      .unwrap()
      .then(async (res) => {
        if (res.success) {
          await dispatch(getToDos()).then();
        } else {
          console.error("Failed to create ToDo:", res.message);
        }
      })
      .catch((error) => {
        console.error("An error occurred while creating ToDo:", error);
      })
      .finally(() => {
        setAddLoading(false);
      });
  };

  const handleDeleteToDo = (id) => {
    setDeleteLoadingId(id);
    dispatch(deleteToDo(id))
      .unwrap()
      .then(async (res) => {
        console.log("Deleted ToDo:", res);
        if (res?.data?.success) {
          await dispatch(getToDos()).then();
        } else {
          console.error("Failed to create ToDo:", res.message);
        }
      })
      .catch((error) => {
        console.error("An error occurred while creating ToDo:", error);
      })
      .finally(() => {
        setDeleteLoadingId("");
      });
  };

  const handleUpdateToDo = ({ completed, id }) => {
    setInput("");
    dispatch(updateToDo({ id, payload: { completed: completed } }))
      .unwrap()
      .then(async (res) => {
        if (res.success) {
          await dispatch(getToDos()).then();
        } else {
          console.error("Failed to create ToDo:", res.message);
        }
      })
      .catch((error) => {
        console.error("An error occurred while creating ToDo:", error);
      });
  };

  useEffect(() => {
    dispatch(getToDos());
    dispatch(getUserDetails());
  }, []);

  return (
    <Box
      sx={{
        width: "auto",
        display: "flex",
        alignItems: "center",

        flexDirection: "column",
        backgroundColor: "#415a77",
        height: "100vh",
      }}
    >
      <TopBar />
      <Box
        sx={{
          width: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          padding: "10px",
        }}
      >
        <Typography variant="h4" sx={{ mb: 4 }}>
          To-DO App
        </Typography>

        <Paper
          component="form"
          sx={{
            display: "flex",
            width: "auto",
            backgroundColor: "#e0e1dd",
            paddingLeft: "5px",
            height: "50px",
          }}
        >
          <InputBase
            sx={{ flex: 1 }}
            placeholder={
              readOnlyPermission
                ? "You have only readonly permission!"
                : "What is your next task?"
            }
            value={input}
            onChange={(e) => {
              if (e.target.value.length <= 60) {
                setInput(e.target.value);
              }
            }}
            disabled={readOnlyPermission}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => !!input && handleCreateToDo(input)}
            disabled={addLoading || readOnlyPermission}
            startIcon={!addLoading && <AddCircleIcon />}
            size="large"
            sx={{ backgroundColor: "#0d1b2a" }}
          >
            {addLoading ? (
              <CircularProgress
                sx={{ color: "Primary", height: "1px", width: "1px" }}
                size={"22px"}
              />
            ) : (
              "Add"
            )}
          </Button>
        </Paper>

        <List>
          {todos.map((todo, index) => (
            <ListItem
              key={todo._id}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                backgroundColor: "#778da9",
                borderRadius: "4px",
                width: "100%",
                marginBottom: "5px",
              }}
            >
              <ListItemText primary={todo.task} />
              <Button
                onClick={() => handleDeleteToDo(todo._id)}
                sx={{ cursor: "pointer" }}
                disabled={readOnlyPermission}
              >
                {deleteLoadingId === todo._id ? (
                  <CircularProgress
                    sx={{
                      color: readOnlyPermission ? "gray" : "#0d1b2a",
                      height: "1px",
                      width: "1px",
                    }}
                    size={"22px"}
                  />
                ) : (
                  <DeleteIcon
                    sx={{
                      color: readOnlyPermission ? "gray" : "#0d1b2a",
                    }}
                  />
                )}
              </Button>
              <Button
                onClick={() =>
                  handleUpdateToDo({
                    id: todo._id,
                    completed: !todo.completed,
                  })
                }
                disabled={readOnlyPermission}
              >
                {todo.completed ? (
                  <CheckCircleIcon
                    sx={{ color: readOnlyPermission ? "gray" : "#0d1b2a" }}
                  />
                ) : (
                  <PanoramaFishEyeIcon
                    sx={{ color: readOnlyPermission ? "gray" : "#999999" }}
                  />
                )}
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ToDoPage;
