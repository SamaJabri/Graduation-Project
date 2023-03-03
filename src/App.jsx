import { Outlet } from "react-router-dom";

import "./App.css";

import Header from "./components/bar/Header";
import Navbar from "./components/bar/Navbar";

import usePatientsStore from "./store/patient/patients-store";

function App() {
  const darkMode = usePatientsStore((state) => state.darkMode);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Header />
      <div style={{ marginTop: "4rem", marginBottom: "4rem" }}>
        <Outlet />
      </div>
      <Navbar />
    </div>
  );
}

export default App;
