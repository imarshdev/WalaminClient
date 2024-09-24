import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Signin() {
  const [formData, setFormData] = useState({
    username: "",
    token: "",
  });

  const { setUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/signin", formData);

      // Store user data in global state
      setUser({
        username: response.data.username,
        contact: response.data.contact,
        token: response.data.token,
      });
    } catch (error) {
      console.error("Error signing in:", error.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="token"
        placeholder="Six-digit Token"
        value={formData.token}
        onChange={handleChange}
        required
      />
      <button type="submit">Sign In</button>
    </form>
  );
}

export default Signin;
