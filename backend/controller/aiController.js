const axios = require('axios');
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = process.env.GEMINI_URL;

exports.processText = async (req, res) => {
  const { text, mode, tone, goalType } = req.body;

  try {

    const prompt = mode === "goal"
      ? buildGoalPrompt(goalType, text, tone)
      : buildPrompt(text, mode, tone);

    const response = await axios.post(
        `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
        {
            contents: [{ parts: [{ text: prompt }] }]
        },
        {
            headers: {
                "Content-Type": "application/json"
                }
        }
    );

    const aiReply = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    res.json({ original: text, result: aiReply });

  } catch (error) {
    console.error('Gemini Error:', error.message);
    res.status(500).json({ error: 'AI processing failed' });
  }
};

function buildPrompt(text, mode, tone = "default") {
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
    case "goal":
      return  buildGoalPrompt(goalType, text, tone);
    default:
      return `Improve the overall quality of this writing:\n\n"${text}"`;
  }
}

function buildGoalPrompt(goal, topic, tone = "default") {
  switch (goal) {
    case "email":
      return `Write a ${tone} professional email based on this topic:\n"${topic}"\nInclude greeting, body, and signature,`;
    case "essay":
      return `Write a well-structured ${tone} essay on:\n"${topic}"\nInclude an introducation, body, and conclusion,`;
    case "story":
      return `Write a short ${tone} story based on this idea:\n"${topic}"\nUse creative and engaging language.`;
    case "resume":
      return `Help create resume content for:\n"${topic}"\nRespond in resume-style bullet points, using a ${tone} tone.`;
    default:
      return `Generate text based on:\n"${topic}"`;
  }
}
