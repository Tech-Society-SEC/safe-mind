import mongoose from "mongoose";
// You usually need to import and run dotenv in your server.js, 
// but sometimes in the config file if it's run first.

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
        // Exit process with failure
        process.exit(1); 
    }
};