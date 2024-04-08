import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_REGISTER_API } from "../services/api";
import CircularProgress from '@mui/material/CircularProgress';

const Register = () => {
  const navigate = useNavigate();
  const defaultTheme = createTheme();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);
  const [loading, setLoading] = useState(false)

  // Form submit call back function
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true)
      const userData = await axios.post(USER_REGISTER_API, data);
      setLoading(false)
      setShowSuccessAlert(true);
      localStorage.setItem("user", JSON.stringify({ ...data, password: "" }));
      navigate("/login");
      console.log("Register Successful", userData);
    } catch (e) {
      setLoading(false)
      setShowFailureAlert(true);
      console.log("user or password not correct", e);
    }

    // event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   name: data.get("name"),
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSuccessAlert(false);
    setShowFailureAlert(false);
  };

  useEffect (() => {
    if (localStorage.getItem('user')){
      navigate('/')
    }
  }, [navigate])

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            {loading && <CircularProgress disableShrink />}
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                value={data.name}
                onChange={handleChange}
                autoComplete="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={data.email}
                onChange={handleChange}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={data.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already a member? Sign In"}
                  </Link>
                </Grid>
                <Snackbar
                  open={showSuccessAlert}
                  autoHideDuration={6000}
                  onClose={handleCloseAlert}
                >
                  <Alert onClose={handleCloseAlert} severity="success">
                    Login or registration successful!
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={showFailureAlert}
                  autoHideDuration={6000}
                  onClose={handleCloseAlert}
                >
                  <Alert onClose={handleCloseAlert} severity="error">
                    Login or registration Failed! Please try again
                  </Alert>
                </Snackbar>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Register;
