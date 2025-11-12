// backend/index.js
import express from "express";
import cors from "cors";
import generateContent from "./routes/gemini.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors()); // allow cross-origin requests from your frontend
app.use(express.json());

app.get("/gemini", generateContent);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend listening on http://localhost:${PORT}`));
