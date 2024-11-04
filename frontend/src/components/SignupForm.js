import { useState } from "react";
import authStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
    const store = authStore();
    const navigate = useNavigate();

    // Local state for password confirmation and error handling
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();

        // Validation checks
        if (!validatePassword(password)) {
            setError("Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setError(""); // Clear any existing error
        store.updateSignupForm({ target: { name: "password", value: password } });
        
        await store.signup();
        navigate("/login");
    };

    // Password validation function
    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return password.length >= 8 && hasUpperCase && hasNumber && hasSpecialChar;
    };

    return (
        <form onSubmit={handleSignup}>
            <input 
                onChange={store.updateSignupForm} 
                value={store.signupForm.email} 
                type="email" 
                name="email"
                placeholder="Email" 
                required 
            />
            <input 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password" 
                name="password"
                placeholder="Password" 
                required 
            />
            <input 
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                type="password" 
                name="confirmPassword"
                placeholder="Confirm Password" 
                required 
            />
            {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}
            <button type="submit">Sign Up</button>
        </form>
    );
}
