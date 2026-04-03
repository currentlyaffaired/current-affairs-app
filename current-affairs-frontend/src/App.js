import { useState } from "react";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Quiz from "./pages/Quiz";
import Starred from "./pages/Starred";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const role = localStorage.getItem("role");
  const [page, setPage] = useState("home");

  if (!token) return <Login setToken={setToken} />;

  return (
    <div>
      <Navbar setPage={setPage} />

      {page === "home" && (
        <>
          {role === "admin" && <Admin />}
          <Dashboard />
        </>
      )}

      {page === "quiz" && <Quiz />}
      {page === "starred" && <Starred />}
    </div>
  );
}

export default App;