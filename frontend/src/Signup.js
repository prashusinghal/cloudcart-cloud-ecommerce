import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });

      alert("Signup successful!");
      window.location.href = "/login";
    } catch (err) {
      alert("Signup failed!");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create CloudCart Account</h2>

        <input
          type="text"
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
        />

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

        <button onClick={handleSignup}>Signup</button>

        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;