import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./context/userContext.jsx";
import { RiderProvider } from "./context/riderContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <RiderProvider>
      <App />
    </RiderProvider>
  </UserProvider>
);

