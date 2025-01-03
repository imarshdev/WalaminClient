import React, { useEffect } from "react";
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
import RideRequestForm from "./components/RideRequestForm.jsx";
import DriverRideList from "./components/DriverRideList.jsx";
import ScheduleRide from "./components/schedule.jsx";
import RiderSignUp from "./pages/riderSignUp.jsx";
import RideRequest from "./components/rideRequest.jsx";
import RideReq from "./pages/NewRide/ride.jsx";
import StoreHome from "./store/storehome.jsx";

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
    path: "/ride-request",
    element: <RideRequestForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/driver-rides",
    element: <DriverRideList />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/schedule-ride",
    element: <ScheduleRide />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/riderSignUp",
    element: <RiderSignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/riderequest",
    element: <RideRequest />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/ridereq",
    element: <RideReq />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/store",
    element: <StoreHome />,
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
