import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/bar/Header";
import Navbar from "./components/bar/Navbar";

function App() {
  return (
    <div>
      <Header />
      <div style={{ marginTop: "4rem", marginBottom: "5rem" }}>
        <Outlet />
      </div>
      <Navbar />
    </div>
  );
}

export default App;
