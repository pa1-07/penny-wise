import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Notfound from "./pages/Notfound"
import './assets/styles/App.css'
import Register from "./pages/Register";
import Login from "./pages/Login";

const App = () => {
  return (
    <Router>
      <>
        <Routes>
          <Route exact path="/" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </>
    </Router>
  );
};

export function ProtectedRoutes(props) {
  if(localStorage.getItem('user')) {
    return props.children
  } else {
    return <Navigate to='login' />
  }
}

export default App;
