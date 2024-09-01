import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import { store } from "../redux/store.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <HelmetProvider>
      <CssBaseline />
      <App />
    </HelmetProvider>
  </Provider>
);
