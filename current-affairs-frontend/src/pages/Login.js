import { useState } from "react";
import API from "../api";

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  const res = await API.post("/auth/login", {
    username,
    password
  });

  localStorage.setItem("token", res.data.token);

  const payload = JSON.parse(atob(res.data.token.split(".")[1]));
  localStorage.setItem("role", payload.role);

  setToken(res.data.token);
};

  return (
  <div className="container">
    <h2>Login</h2>

    <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
    <br />
    <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
    <br />

    <button onClick={handleLogin}>Login</button>
  </div>
);
}

export default Login;