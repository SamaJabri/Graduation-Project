import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Home from "./pages/Home";
import AddTest from "./pages/AddTest";
import Examination from "./pages/Examination";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Tests from "./pages/Tests";
import TestDetails from "./pages/TestDetails";
import Loading from "./pages/Loading";
import NotFound from "./pages/NotFound";
import Login2 from "./pages/Login2";
import SignUp from "./pages/SignUp";
//import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#218d87",
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "add",
        element: <AddTest />,
      },
      {
        path: "profile/:id",
        element: <Profile />,
      },
      {
        path: "tests",
        element: <Tests />,
      },
      {
        path: "tests/:id",
        element: <TestDetails />,
      },
      {
        path: "examination/:id",
        element: <Examination />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login2 />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
