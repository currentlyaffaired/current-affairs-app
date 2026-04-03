import { useState } from "react";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const role = localStorage.getItem("role");

  if (!token) return <Login setToken={setToken} />;

  return (
    <div>
      <Navbar />

      {role === "admin" && <Admin />}

      <Dashboard />
    </div>
  );
}

export default App;