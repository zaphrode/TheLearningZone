import create from "zustand";
import axios from "axios";

// Set the base URL for axios if your backend is on a different port
axios.defaults.baseURL = "http://localhost:3001"; // Change this to match your backend server URL
// Ensure axios sends cookies with requests
axios.defaults.withCredentials = true;

const authStore = create((set, get) => ({
  loggedIn: null,

  loginForm: {
    email: "",
    password: "",
  },

  signupForm: {
    email: "",
    password: "",
    confirmPassword: "", // Add confirmPassword field
  },

  updateLoginForm: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      loginForm: {
        ...state.loginForm,
        [name]: value,
      },
    }));
  },

  updateSignupForm: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      signupForm: {
        ...state.signupForm,
        [name]: value,
      },
    }));
  },

  validatePassword: (password) => {
    // Password must have at least 8 characters, one uppercase, one number, and one special character
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= 8 && hasUpperCase && hasNumber && hasSpecialChar;
  },

  signup: async () => {
    try {
      const { signupForm, validatePassword } = get();

      // Validate password complexity
      if (!validatePassword(signupForm.password)) {
        console.error("Password must have at least 8 characters, including an uppercase letter, a number, and a special character.");
        return false;
      }

      // Check if passwords match
      if (signupForm.password !== signupForm.confirmPassword) {
        console.error("Passwords do not match.");
        return false;
      }

      // Prepare the signup data (excluding confirmPassword)
      const { email, password } = signupForm;

      // Send the signup request
      const res = await axios.post("/signup", { email, password });

      if (res.status === 200) {
        // Reset the signup form after successful signup
        set({
          signupForm: {
            email: "",
            password: "",
            confirmPassword: "",
          },
        });
        console.log("Signup successful.");
        return true;
      } else {
        console.error("Signup failed:", res.data);
        return false;
      }
    } catch (error) {
      console.error("Signup failed. Error details:", error.response ? error.response.data : error.message);
      return false;
    }
  },

  login: async () => {
    try {
      const { loginForm } = get();

      console.log("Sending login request with:", loginForm);

      const res = await axios.post("/login", loginForm, { timeout: 5000 });

      console.log("Login successful. Response data:", res.data);

      if (res.data.success) {
        set({
          loggedIn: true,
          loginForm: {
            email: "",
            password: "",
          },
        });
        return true;
      } else {
        console.error("Login failed. Server responded with:", res.data);
        set({
          loginForm: {
            email: "",
            password: "",
          },
        });
        return false;
      }
    } catch (error) {
      console.error("Login failed. Error details:", error.response ? error.response.data : error.message);
      set({
        loginForm: {
          email: "",
          password: "",
        },
      });
      return false;
    }
  },

  logout: async () => {
    try {
      await axios.get("/logout");
      set({ loggedIn: false });
      console.log("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed. Error details:", error.response ? error.response.data : error.message);
    }
  },
}));

export default authStore;

  