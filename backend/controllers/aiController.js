const axios = require("axios");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent";

exports.processText = async (req, res) => {
  const {
    text,
    mode,
    tone = "default",
    goalType,
    language = "en",
    targetAudience = "general",
    formality = "neutral"
  } = req.body;

  if (!text || !mode) {
    return res.status(400).json({
      error: "text and mode are required"
    });
  }

  if (!GEMINI_API_KEY) {
    return res.status(500).json({
      error: "GEMINI_API_KEY missing on server"
    });
  }

  console.log("🧠 /spell/process", {
    mode,
    textLength: text.length
  });

  try {
    const prompt = buildPrompt(text, mode, {
      tone,
      goalType,
      language,
      targetAudience,
      formality
    });

    const response = await axios.post(
      `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024
        }
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 20000
      }
    );

    const candidates = response.data?.candidates;

    if (!candidates || candidates.length === 0) {
      console.warn("⚠️ Gemini returned empty candidates");
      return res.json({
        original: text,
        result: "AI could not generate a response for this input.",
        mode,
        metadata: {
          originalLength: text.length,
          resultLength: 0,
          language
        }
      });
    }

    const aiReply = candidates[0]?.content?.parts?.[0]?.text;

    if (!aiReply) {
      console.warn("⚠️ Gemini response had no text");
      return res.json({
        original: text,
        result: "AI response was blocked or empty.",
        mode,
        metadata: {
          originalLength: text.length,
          resultLength: 0,
          language
        }
      });
    }

    res.json({
      original: text,
      result: aiReply.trim(),
      mode,
      metadata: {
        originalLength: text.length,
        resultLength: aiReply.length,
        language
      }
    });

  } catch (error) {
    console.error(
      "❌ Gemini API error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      error: "AI processing failed",
      details: error.response?.data || error.message
    });
  }
};

function buildPrompt(text, mode, options) {
  const { tone, goalType, language, targetAudience, formality } = options;

  const langMap = {
    en: "English",
    hi: "Hindi",
    es: "Spanish",
    fr: "French"
  };

  const lang = langMap[language] || "English";

  switch (mode) {
    case "spell":
      return `Correct spelling mistakes in this ${lang} text.
Return ONLY the corrected text.

Text:
${text}`;

    case "grammar":
      return `Fix grammar issues in this ${lang} text.
Return ONLY the corrected text.

Text:
${text}`;

    case "rephrase":
      return `Rephrase this for a ${targetAudience} audience with ${formality} formality:

${text}`;

    case "tone":
      return `Rewrite this in a ${tone} tone for ${targetAudience} audience:

${text}`;

    case "vocabulary":
      return `Improve vocabulary while keeping meaning same:

${text}`;

    case "expand":
      return `Expand this text with more detail:

${text}`;

    case "compress":
      return `Make this text concise:

${text}`;

    case "analyze":
      return `Analyze the following text and give suggestions:

${text}`;

    case "seo":
      return `SEO optimize this content:

${text}`;

    case "translate":
      return `Translate this text to ${lang}:

${text}`;

    case "summarize":
      return `Summarize this text:

${text}`;

    case "bullets":
      return `Convert this text into bullet points:

${text}`;

    case "goal":
      return buildGoalPrompt(goalType, text, tone, targetAudience);

    default:
      return `Improve this text:

${text}`;
  }
}

function buildGoalPrompt(goal, topic, tone, targetAudience) {
  switch (goal) {
    case "email":
      return `Write a ${tone} email for ${targetAudience} about:
${topic}`;

    case "essay":
      return `Write a ${tone} essay for ${targetAudience} on:
${topic}`;

    case "story":
      return `Write a ${tone} story for ${targetAudience} about:
${topic}`;

    case "blog":
      return `Write a ${tone} blog post for ${targetAudience} on:
${topic}`;

    case "social":
      return `Create social media content about:
${topic}`;

    case "resume":
      return `Create resume content about:
${topic}`;

    case "cover_letter":
      return `Write a ${tone} cover letter about:
${topic}`;

    default:
      return `Generate ${tone} content for ${targetAudience} about:
${topic}`;
  }
}