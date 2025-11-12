import express from "express";
import { GoogleGenerativeAI } from "@google-ai/gemini";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;
    const result = await model.generateContent(question);
    res.json({ answer: result.response.text() });
  } catch (error) {
    res.status(500).json({ message: "Gemini API error", error });
  }
});

export default router;
