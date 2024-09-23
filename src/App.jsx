import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PWABadge from "./PWABadge.jsx";
import "./App.css";
import Home from "./pages/home.jsx";
import ErrorPage from "./pages/errorpage.jsx";
import AllServices from "./pages/services.jsx";
import Account from "./pages/account.jsx";
import Signin from "./pages/signin.jsx";
import Signup from "./pages/signup.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/services",
    element: <AllServices />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/account",
    element: <Account />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signin",
    element: <Signin />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <ErrorPage />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <PWABadge />
    </>
  );
}

export default App;
