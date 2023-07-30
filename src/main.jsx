import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import RoutesWrapper from "./setup/RoutesWrapper";
import Loader from "./shared/components/Loader";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Loader isContainerWide takesRemainingHeight />}>
        <RoutesWrapper />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
