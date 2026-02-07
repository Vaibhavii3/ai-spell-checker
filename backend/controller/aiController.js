const axios = require("axios");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

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

  try {
    const prompt = buildAdvancedPrompt(text, mode, {
      tone,
      goalType,
      language,
      targetAudience,
      formality
    });

    const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

    const response = await axios.post(
      `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: mode === "creative" ? 0.9 : 0.7,
          maxOutputTokens: 2048,
        }
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    const aiReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    res.json({
      original: text,
      result: aiReply || "No response from AI",
      mode: mode,
      metadata: {
        originalLength: text.length,
        resultLength: aiReply?.length || 0,
        language: language
      }
    });

  } catch (error) {
    console.error("Gemini error:", error.response?.data || error.message);
    res.status(500).json({
      error: "AI processing failed",
      details: error.response?.data || error.message
    });
  }
};

function buildAdvancedPrompt(text, mode, options) {
  const { tone, goalType, language, targetAudience, formality } = options;
  
  const langMap = {
    "en": "English",
    "hi": "Hindi", 
    "es": "Spanish",
    "fr": "French",
    "jp": "Japanese"
  };
  
  const lang = langMap[language] || "English";

  switch (mode) {
    case "spell":
      return `Correct spelling mistakes in this ${lang} text and provide a detailed report:

Text: "${text}"

Provide response in this format:
1. Corrected Text: [full corrected version]
2. Errors Found: [list each error with correction]
3. Confidence: [high/medium/low for each correction]`;

    case "grammar":
      return `Fix grammar issues and explain what was wrong:

Text: "${text}"

Provide:
1. Corrected text
2. Grammar rules violated
3. Explanations for each fix`;

    case "rephrase":
      return `Rephrase for a ${targetAudience} audience with ${formality} formality:\n\n"${text}"`;

    case "tone":
      return `Rewrite in ${tone} tone for ${targetAudience} audience:\n\n"${text}"`;

    case "vocabulary":
      return `Enhance vocabulary while maintaining ${formality} formality:\n\n"${text}"`;

    case "expand":
      return `Expand this with more details and context (target 2x length):\n\n"${text}"`;

    case "compress":
      return `Make this more concise (target 50% of original):\n\n"${text}"`;

    case "analyze":
      return `Analyze this text comprehensively:
- Readability score
- Tone and formality level
- Strengths and weaknesses
- Improvement suggestions
- Target audience fit

Text: "${text}"`;

    case "seo":
      return `SEO optimize this content:
- Keyword density analysis
- Meta description (150-160 chars)
- Title suggestions
- Readability improvements

Content: "${text}"`;

    case "translate":
      return `Translate this to ${lang} maintaining tone and context:\n\n"${text}"`;

    case "summarize":
      return `Create a concise summary (3-5 sentences) of:\n\n"${text}"`;

    case "bullets":
      return `Convert this text into clear bullet points:\n\n"${text}"`;

    case "goal":
      return buildGoalPrompt(goalType, text, tone, targetAudience);

    default:
      return `Improve the overall quality of this writing:\n\n"${text}"`;
  }
}

function buildGoalPrompt(goal, topic, tone, targetAudience) {
  switch (goal) {
    case "email":
      return `Write a ${tone} email for ${targetAudience}:
Topic: "${topic}"
Include: subject line, greeting, body, signature`;

    case "essay":
      return `Write a ${tone} essay for ${targetAudience}:
Topic: "${topic}"
Structure: intro, 3 body paragraphs, conclusion
Length: 500-700 words`;

    case "story":
      return `Write a ${tone} story for ${targetAudience}:
Theme: "${topic}"
Include: setting, characters, conflict, resolution`;

    case "blog":
      return `Write a ${tone} blog post for ${targetAudience}:
Topic: "${topic}"
Include: catchy title, intro, main points, conclusion, CTA`;

    case "social":
      return `Create social media posts (Twitter, LinkedIn, Instagram) about:
"${topic}"
Tone: ${tone}
Audience: ${targetAudience}`;

    case "resume":
      return `Create resume content for ${targetAudience}:
"${topic}"
Format: professional bullet points, ${tone} tone`;

    case "cover_letter":
      return `Write a ${tone} cover letter for ${targetAudience}:
Position/Topic: "${topic}"`;

    default:
      return `Generate ${tone} content for ${targetAudience} about:\n"${topic}"`;
  }
}