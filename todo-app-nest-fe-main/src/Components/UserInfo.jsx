import React from "react";
import { Box, Avatar, Typography } from "@mui/material";

const UserInfo = ({ name, email, roles }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <Avatar alt="User Profile" sx={{ width: 60, height: 60, margin: "auto" }}>
        {name ? name.charAt(0) : ""}
      </Avatar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <Typography variant="caption">{email}</Typography>
        <Typography variant="caption">{roles[0]}</Typography>
      </Box>
    </Box>
  );
};

export default UserInfo;
