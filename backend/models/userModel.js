// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Add other fields here if needed
}, {
    timestamps: true
});

// --- CRITICAL PRE-SAVE HOOK (HASHING PASSWORD) ---
// This runs BEFORE saving the user to the database (for signup)
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// --- CRITICAL METHOD FOR LOGIN ---
// This custom method is used by your controller to check the password
userSchema.methods.matchPassword = async function (enteredPassword) {
    // Compares the plaintext password with the hashed password
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;