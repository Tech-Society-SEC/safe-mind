// controllers/userController.js

import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// Helper function to generate the token (using the secret from .env)
const generateToken = (id) => {
    // Note: process.env.JWT_SECRET is loaded by dotenv in server.js
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// --- Login Controller ---
export const loginUser = async (req, res) => {
    // Frontend sent: { email, password }
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        // 1. Check if user exists AND if the password is correct using the custom method
        if (user && (await user.matchPassword(password))) {
            // 2. Success! Send the token and user data back to the frontend
            res.json({
                username: user.username,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            // 3. Failure
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: 'Server error during login' });
    }
};

// --- Register Controller ---
export const registerUser = async (req, res) => {
    // Frontend sent: { username (from 'name'), email, password }
    const { username, email, password } = req.body; 
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already registered' });

        // The password will be hashed automatically by the pre-save hook in the User model
        const user = new User({ username, email, password });
        await user.save();

        // Success! Send the token and user data back to the frontend
        res.status(201).json({
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch (err) {
        console.error("Register Error:", err);
        res.status(500).json({ message: 'Server error during registration' });
    }
};