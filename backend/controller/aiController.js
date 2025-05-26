const axios = require('axios');
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = process.env.GEMINI_URL;

exports.processText = async (req, res) => {
  const { text, mode, tone } = req.body;

  try {
    const prompt = buildPrompt(text, mode, tone);

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
    default:
      return `Improve the overall quality of this writing:\n\n"${text}"`;
  }
}
