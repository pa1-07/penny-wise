import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Header.css";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

const Header = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogout = (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      localStorage.clear();
      navigate("/login");
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log("Logout Failed", e);
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDashboardClick = (event) => {
    setAnchorEl(event.currentTarget);
    navigate("/dashboard");
  };

  const handleHomeClick = (event) => {
    setAnchorEl(event.currentTarget);
    navigate("/");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {loading && <CircularProgress disableShrink />}
      <AppBar position="fixed" className="navBar">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            className="navbarTitle"
          >
            PennyWise
          </Typography>
          <Box
            sx={{
              "&:hover": { backgroundColor: "#12358e" },
              fontWeight: "bold",
              mr: 2,
              mt: 0.4,
              p: 0.5,
              borderRadius: 2,
            }}
          >
            <Button
              className="dashboardBtn"
              id="fade-button"
              onClick={handleHomeClick}
            >
              Home
            </Button>
          </Box>
          <Box
            sx={{
              "&:hover": { backgroundColor: "#12358e" },
              fontWeight: "bold",
              mr: 130,
              mt: 0.4,
              p: 0.5,
              borderRadius: 2,
            }}
          >
            <Button
              className="dashboardBtn"
              id="fade-button"
              onClick={handleDashboardClick}
            >
              Dashboard
            </Button>
          </Box>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
