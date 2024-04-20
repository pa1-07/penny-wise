import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import "../assets/styles/Footer.css";

const Footer = () => {
  return (
    <>
      <AppBar
        position="fixed"
        className="footerNav"
        style={{ top: "auto", bottom: 0 }}
      >
        <Toolbar>
          <Typography variant="body2" color="black" sx={{mb:2}}>
          © 2024 PennyWise
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Footer;
