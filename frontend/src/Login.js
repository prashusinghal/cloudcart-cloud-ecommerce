import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      window.location.href = "/";
    } catch (err) {
      alert("Login failed!");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login to CloudCart</h2>

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <p>
          Don't have an account? <a href="/signup">Signup</a>
        </p>
      </div>
    </div>
  );
}

export default Login;