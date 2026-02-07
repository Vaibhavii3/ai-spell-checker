const axios = require("axios");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

exports.processText = async (req, res) => {
  const { text, mode, tone = "default", goalType } = req.body;

  if (!text || !mode) {
    return res.status(400).json({
      error: "text and mode are required"
    });
  }

  try {
    const prompt =
      mode === "goal"
        ? buildGoalPrompt(goalType, text, tone)
        : buildPrompt(text, mode, tone);

    
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent";

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

/* ================= HELPERS ================= */

function buildPrompt(text, mode, tone) {
  switch (mode) {
    case "spell":
      return `Correct the spelling mistakes in this text:\n\n"${text}"`;

    case "grammar":
      return `Fix grammar issues in the following text:\n\n"${text}"`;

    case "rephrase":
      return `Rephrase this sentence to improve clarity:\n\n"${text}"`;

    case "tone":
      return `Rewrite the following text in a ${tone} tone:\n\n"${text}"`;

    case "vocabulary":
      return `Enhance the vocabulary in this text using more sophisticated words:\n\n"${text}"`;

    default:
      return `Improve the overall quality of this writing:\n\n"${text}"`;
  }
}

function buildGoalPrompt(goal, topic, tone) {
  switch (goal) {
    case "email":
      return `Write a ${tone} professional email based on this topic:\n"${topic}"\nInclude greeting, body, and signature.`;

    case "essay":
      return `Write a well-structured ${tone} essay on:\n"${topic}"\nInclude an introduction, body, and conclusion.`;

    case "story":
      return `Write a short ${tone} story based on this idea:\n"${topic}"\nUse creative and engaging language.`;

    case "resume":
      return `Create resume content for:\n"${topic}"\nRespond in resume-style bullet points using a ${tone} tone.`;

    default:
      return `Generate text based on:\n"${topic}"`;
  }
}