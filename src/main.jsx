import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import RoutesWrapper from "./setup/RoutesWrapper";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <RoutesWrapper />
    </BrowserRouter>
  </React.StrictMode>
);
