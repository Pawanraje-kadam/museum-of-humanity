export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const body = JSON.parse(event.body);
    const term = body.term || 'Unknown Concept';

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      throw new Error('GROQ_API_KEY missing');
    }

    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          temperature: 0.9,
          max_tokens: 200,
          messages: [
            {
              role: 'system',
              content:
                'You are an alien archivist from the year 1,000,000 CE studying the extinct human species. Write short analyses that are clinical, dramatic, slightly inaccurate, and entertaining. Never use markdown, bullet points, quotes, or asterisks.',
            },
            {
              role: 'user',
              content: `Analyze this human concept: "${term}". Write 2-3 sentences.`,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Groq API Error:', data);
      throw new Error(
        data.error?.message || 'Groq rejected the request'
      );
    }

    const analysisText =
      data?.choices?.[0]?.message?.content ||
      '[ARCHIVE CORRUPTION DETECTED: Response fragment lost.]';

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        analysis: analysisText,
      }),
    };
  } catch (error) {
    console.error('Groq Fetch Error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Synthesis Failed',
        details: error.message,
      }),
    };
  }
};
