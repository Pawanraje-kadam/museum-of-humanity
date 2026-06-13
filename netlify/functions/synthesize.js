export const handler = async (event) => {
  // 1. Security check: Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // 2. Parse the user's input from the frontend request
    const { term } = JSON.parse(event.body);
    
    // 3. Securely access the API key from Netlify's environment variables
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return { statusCode: 500, body: JSON.stringify({ error: "Missing API Key" }) };
    }

    // 4. The Strict Narrative Prompt (Prompt Engineering)
    // This forces the AI to stay in character and prevents hallucinations.
    const systemPrompt = `You are Archivist-Prime, a diagnostic AI from the year 1,000,000 CE. Humanity is extinct. Analyze the concept: "${term}". Rule 1: Profoundly misunderstand its purpose through a cold, literal sci-fi lens. Rule 2: No explicit jokes; humor comes from your deadpan misunderstanding. Rule 3: Maximum 2 short sentences. Rule 4: Do not use the phrase 'As an AI'.`;

    // 5. Fetch request to the Google Gemini API endpoint
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemPrompt }] }]
      })
    });

    // 6. Parse the response from Gemini
    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;

    // 7. Send the successful response back to our React frontend
    return {
      statusCode: 200,
      body: JSON.stringify({ analysis: generatedText })
    };

  } catch (error) {
    // 8. Graceful Error Handling
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Synthesis Failed", details: error.message })
    };
  }
};
