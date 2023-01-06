import React from "react";
import { render } from "react-dom";
import App from "./App";
import "reflect-metadata";
import "@/theme/base.css"
import "antd/dist/antd.css";
import "./index.css"

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
