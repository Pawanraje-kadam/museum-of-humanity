import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body);
    const term = body.term || "Unknown Concept";

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("API Key missing");

    const genAI = new GoogleGenerativeAI(apiKey);

    // 1. Lower safety filters so the AI doesn't block sci-fi concepts
    const safetySettings = [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    ];

const model = genAI.getGenerativeModel({ 
  model: 'gemini-pro',
  safetySettings 
});

    const prompt = `Act as an alien archivist from the year 1,000,000 CE. You are analyzing a digital artifact from the extinct human species. The human concept to analyze is: "${term}". Write a 2-3 sentence clinical, slightly misunderstood, and highly dramatic analysis of this concept. Do not use any markdown formatting, asterisks, or quotes in your response. Just plain text.`;

    const result = await model.generateContent(prompt);

    // 2. Bulletproof text extraction (prevents the '0' error crash)
    let analysisText = "";
    try {
      analysisText = result.response.text();
    } catch (err) {
      // If Google still blocks the response, we send a cool sci-fi error instead of crashing
      analysisText = "[ARCHIVE CORRUPTION DETECTED: This human concept triggered severe alien safety protocols. Data expunged.]";
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ analysis: analysisText }),
    };

  } catch (error) {
    console.error('API Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Synthesis Failed', details: error.message }),
    };
  }
};
