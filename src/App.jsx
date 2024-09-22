import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PWABadge from "./PWABadge.jsx";
import SignIn from "./pages/signin.jsx";
import "./App.css";

function App() {

  return (
    <>
      <SignIn />
      <PWABadge />
    </>
  );
}

export default App;
