import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [data, setData] = useState({});

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:7000/user/register", data);
      alert("Registered successfully");
      window.location.href = "/";
    } catch (err) {
      alert(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
      >
        <input
          name="name"
          placeholder="Name"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <br />

        <input
          name="email"
          placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <br />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;