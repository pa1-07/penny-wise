import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StyledEngineProvider } from "@mui/material/styles";
import {BrowserRouter} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
     <StyledEngineProvider injectFirst>     {/* @mui/styles is not compatible with React.StrictMode or React 18. So, we need to wrap our root "App" component in the index.js file with "StyledEngineProvider" with injectFirst set to True. */}
      <App />
    </StyledEngineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
