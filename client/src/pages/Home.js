import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import "../assets/styles/index.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const Home = () => {
  const [add, setAdd] = useState(false);
  const modalOpen = () => {
    setAdd(true);
  };
  const modalClose = () => {
    setAdd(false);
  };

  return (
    <>
      <Layout>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          className="homeCards"
          sx={{ width: "20%", backgroundColor: "whitesmoke" }}
        >
          <SnackbarContent
            message="Range Filters"
            sx={{ backgroundColor: "whitesmoke", color: "black" }}
          />
          <Button
            color="secondary"
            size="small"
            sx={{
              backgroundColor: "whitesmoke",
              color: "black",
              "&:hover": { backgroundColor: "lightgrey" },
            }}
            onClick={modalOpen}
          >
            Add
          </Button>
        </Stack>
        <Modal open={add} onClose={modalClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              height: 400,
              bgcolor: "background.paper",
              border: "2px solid #cccccc",
              borderRadius: 4,
              boxShadow: 24,
              p: 4,
            }}
          ></Box>
        </Modal>
      </Layout>
    </>
  );
};

export default Home;
