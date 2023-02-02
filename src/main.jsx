import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Home from "./pages/Home";
import AddTest from "./pages/AddTest";
import Examination from "./pages/Examination";
import Profile from "./pages/Profile";
import Tests from "./pages/Tests";
import Loading from "./pages/Loading";
import NotFound from "./pages/NotFound";
import Login2 from "./pages/Login2";
import SignUp from "./pages/SignUp";
//import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#683636",
    },
    secondary: {
      main: "#402222",
    },
    text: {
      primary: "#683636",
    },
  },
});
/*#CF7C7C*/

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
        path: "examination/:id",
        element: <Examination />,
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
