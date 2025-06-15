import axios from 'axios';

const OPENAI_API_KEY = 'xxxxx';

const gptService = {
  analyzeCase: async (symptoms, visionResult) => {
    const messages = [
      { role: 'system', content: 'You are a professional medical AI assistant.' },
      { role: 'user', content: `The image analysis suggests: ${visionResult}.
Patient described symptoms: ${symptoms}.
\nProvide:\n- Top 3 possible conditions.\n- Severity level (Mild / Moderate / Critical).\n- Suggested next care steps.\n- Use simple patient-friendly language.` }
    ];
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages,
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
    } catch (error) {
      console.error('OpenAI GPT API error:', error.response ? error.response.data : error.message);
      throw error;
    }
  }
};

export default gptService;
