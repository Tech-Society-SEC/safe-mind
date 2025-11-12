// backend/routes/gemini.js
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

// Accept multiple env var names used across examples and SDKs
const API_KEY = process.env.API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  // We throw here so startup shows a clear error if API key missing
  throw new Error("Missing Gemini API key. Set API_KEY or GEMINI_API_KEY or GOOGLE_API_KEY in .env");
}

let genAI;
try {
  // Some older examples pass the key directly; newer SDKs might accept an options object.
  // Passing the string usually works for legacy examples; this is safe and will throw early if wrong.
  genAI = new GoogleGenerativeAI(API_KEY);
} catch (err) {
  console.error("Failed creating GoogleGenerativeAI instance:", err);
  throw err; // fail early so we see it
}

// Get model (if the SDK expects clients differently, this will still show a helpful log)
const model = genAI.getGenerativeModel?.({ model: "gemini-1.5-flash" }) || genAI.models?.get?.("gemini-1.5-flash");

const generateContent = async (req, res) => {
  try {
    const prompt = "Create 5 funny and witty jokes about generative AI";

    // call generateContent — SDKs vary, so try a couple of common patterns
    let result;
    if (typeof model.generateContent === "function") {
      // pattern used previously
      result = await model.generateContent(prompt);
    } else if (typeof genAI.generateContent === "function") {
      // fallback if top-level client exposes it
      result = await genAI.generateContent({ model: "gemini-1.5-flash", prompt });
    } else {
      throw new Error("SDK does not expose generateContent on model or client. Check SDK version.");
    }

    // result.response might be a Promise or an object with text()
    const responseObj = await Promise.resolve(result.response || result);
    const text = typeof responseObj.text === "function" ? responseObj.text() : String(responseObj);

    res.status(200).json({ ok: true, text });
  } catch (err) {
    // log full error so you can paste it here if you need help
    console.error("Gemini error (detailed):", err);
    // return enough info for the client without exposing secrets
    res.status(500).json({ ok: false, message: "There was a problem connecting to the Gemini API.", error: err.message || String(err) });
  }
};

export default generateContent;
