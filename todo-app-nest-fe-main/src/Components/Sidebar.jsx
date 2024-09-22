import React, { useState } from "react";
import {
  AppBar,
  Box,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { logoutUser } from "../utils/common";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";

const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuWidth, setMenuWidth] = useState(null);
  const { email, roles } = useSelector((state) => state.user?.user);
  const isAdmin = roles[0] === "Admin";
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuWidth(event.currentTarget.offsetWidth);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ width: "100%", marginTop: 0 }}>
      <AppBar position="static" sx={{backgroundColor: "#1b263b",}}>
        <Toolbar>
          {isAdmin ? (
            <AdminPanelSettingsIcon fontSize="large" />
          ) : (
            <PersonIcon fontSize="large" />
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {roles[0]}
          </Typography>

          <Button color="inherit" onClick={handleClick}>
            {email}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{
              "& .MuiPaper-root": {
                width: menuWidth ? `${menuWidth}px` : "auto",
              },
            }}
          >
            <MenuItem
              onClick={() => {
                logoutUser();
                handleClose();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopBar;


