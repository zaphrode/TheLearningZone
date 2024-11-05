// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import axios from 'axios';

// Set axios base URL based on environment
axios.defaults.baseURL = process.env.NODE_ENV === 'production'
  ? 'https://the-learning-zone.vercel.app/api'
  : 'http://localhost:3001';  // Local backend for development

axios.defaults.withCredentials = true; // Allow cookies with requests

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
