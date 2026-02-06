const axios = require("axios");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = process.env.GEMINI_URL;

exports.processText = async (req, res) => {
  const { text, mode, tone, goalType } = req.body;

  if (!text || !mode) {
    return res.status(400).json({ error: "text and mode are required" });
  }

  try {
    const prompt =
      mode === "goal"
        ? buildGoalPrompt(goalType, text, tone)
        : buildPrompt(text, mode, tone);

    const response = await axios.post(
      `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const aiReply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    res.json({
      original: text,
      result: aiReply || "No response from AI"
    });

  } catch (error) {
    console.error(
      "Gemini full error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      error: "AI processing failed",
      details: error.response?.data || error.message
    });
  }
};