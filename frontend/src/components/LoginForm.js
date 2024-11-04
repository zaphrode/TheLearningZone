import React from "react";
import { useNavigate } from "react-router-dom";
import authStore from "../stores/authStore";

export default function LoginForm() {
  const store = authStore(); // Initialize the store
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Attempting to log in..."); // Log to see if handleLogin is called

    // Attempt to log in with the store
    const isSuccess = await store.login();

    console.log("Login response:", isSuccess); // Log the response of store.login()

    if (isSuccess) {
      console.log("Login successful! Redirecting to /tutor-home"); // Log before navigation
      navigate("/tutor-home"); // Navigate to Tutor Home upon successful login
    } else {
      console.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        onChange={store.updateLoginForm}
        value={store.loginForm.email} // Controlled input for email
        type="email"
        name="email"
        placeholder="Email"
      />

      <input
        onChange={store.updateLoginForm}
        value={store.loginForm.password} // Controlled input for password
        type="password"
        name="password"
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
