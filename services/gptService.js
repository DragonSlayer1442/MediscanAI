import axios from 'axios';

const OPENAI_API_KEY = 'xxxxx';

const gptService = {
  analyzeCase: async (symptoms, visionResult) => {
    const prompt = `
You are a professional medical AI assistant. The image analysis suggests: ${visionResult}.
Patient described symptoms: ${symptoms}.

Provide:
- Top 3 possible conditions.
- Severity level (Mild / Moderate / Critical).
- Suggested next care steps.
- Use simple patient-friendly language.
`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: [{ role: 'system', content: prompt }],
        temperature: 0.3,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content;
  }
};

export default gptService;
