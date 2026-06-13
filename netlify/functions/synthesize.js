export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body);
    const term = body.term || "Unknown Concept";
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) throw new Error("API Key missing");

    // We bypass the NPM package entirely and hit Google's master endpoint directly
   const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{
        parts: [{ text: `Act as an alien archivist from the year 1,000,000 CE. You are analyzing a digital artifact from the extinct human species. The human concept to analyze is: "${term}". Write a 2-3 sentence clinical, slightly misunderstood, and highly dramatic analysis of this concept. Do not use any markdown formatting, asterisks, or quotes in your response. Just plain text.` }]
      }],
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
      ]
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    // Catch any Google-side errors
    if (!response.ok) {
      console.error("Google API Error:", data);
      throw new Error(data.error?.message || "Google rejected the request");
    }

    // Bulletproof text extraction
    let analysisText = "[ARCHIVE CORRUPTION DETECTED: Alien safety protocols triggered.]";
    if (data.candidates && data.candidates[0].content.parts[0].text) {
      analysisText = data.candidates[0].content.parts[0].text;
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ analysis: analysisText }),
    };

  } catch (error) {
    console.error('Fetch API Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Synthesis Failed', details: error.message }),
    };
  }
};
