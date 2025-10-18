// routes/userRoutes.js
import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js'; // Your controller functions

const router = express.Router();

// The paths here combine with the '/api/users' prefix in server.js

// Matches POST to /api/users/register
router.post('/register', registerUser); 

// Matches POST to /api/users/login
router.post('/login', loginUser);       

export default router;