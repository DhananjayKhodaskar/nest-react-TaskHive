import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const ToDo = ({ task, completed, updateTask, id, deleteTask }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        margin: 5,
        flexDirection: "column",
        backgroundColor: "#aba09f",
      }}
    >
      <h2>{task}</h2>
      <Button
        variant="contained"
        color={completed ? "secondary" : "success"}
        onClick={() =>
          updateTask({
            id,
            data: {
              completed: !completed,
            },
          })
        }
      >
        {completed ? "Mark as Completed" : "Mark as Incomplete"}
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => deleteTask({ id })}
      >
        Delete
      </Button>
    </Box>
  );
};

export default ToDo;
