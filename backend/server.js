// server.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Required for frontend connection
import { connectDB } from './config/db.js'; // Your DB file
import userRoutes from './routes/userRoutes.js'; // We will create this
// import postRoutes from './routes/postRoutes.js'; // Example for other routes

// Load environment variables from .env file
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// --- CRITICAL MIDDLEWARE FOR FRONTEND CONNECTION ---
// 1. Enable CORS: Allows your frontend (e.g., localhost:3000) to talk to the backend.
app.use(cors());

// 2. Body Parser: Essential for reading JSON data sent from the frontend (req.body).
app.use(express.json());

// --- ROUTES SETUP ---
// Define the base path for your authentication routes
// Frontend will call: http://localhost:5000/api/users/login
app.use('/api/users', userRoutes); 
// app.use('/api/posts', postRoutes); // Example

// Simple test route
app.get('/', (req, res) => {
    res.send('API is running...');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));