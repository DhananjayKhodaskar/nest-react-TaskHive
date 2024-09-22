import React from "react";
import { Box, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import { styled } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";

const TaskItemWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "10px 20px",
  marginBottom: "15px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  width: 500,
  height: 50,
}));

const TaskItem = ({
  todo,
  toggleCompletion,
  handleDeleteToDo,
  id,
  deleteLoadingId,
  readOnlyPermission,
}) => {
  return (
    <TaskItemWrapper>
      <Typography variant="h6">{todo.task}</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: "#999999" }}>{todo.time}</Typography>

        <Button
          onClick={() => handleDeleteToDo(id)}
          sx={{ cursor: "pointer" }}
          disabled={readOnlyPermission}
        >
          {deleteLoadingId === id ? (
            <CircularProgress
              sx={{
                color: readOnlyPermission ? "gray" : "#e57373",
                height: "1px",
                width: "1px",
              }}
              size={"22px"}
            />
          ) : (
            <DeleteIcon
              sx={{ color: readOnlyPermission ? "gray" : "#e57373" }}
            />
          )}
        </Button>

        <Button
          onClick={() => toggleCompletion({ id, completed: !todo.completed })}
          disabled={readOnlyPermission}
        >
          {todo.completed ? (
            <CheckCircleIcon
              sx={{ color: readOnlyPermission ? "gray" : "#4caf50" }}
            />
          ) : (
            <PanoramaFishEyeIcon
              sx={{ color: readOnlyPermission ? "gray" : "#999999" }}
            />
          )}
        </Button>
      </Box>
    </TaskItemWrapper>
  );
};

export default TaskItem;
