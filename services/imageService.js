import { openai } from './openaiConfig'; // Or however you configured your API

const generateImages = async (conditionPrompt) => {
  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: `Medical condition: ${conditionPrompt}. Generate a simple realistic medical illustrative images of this condition.`,
      n: 1,
      size: "1024x1024",
    });

    const urls = response.data.map((img) => img.url);
    return urls;
  } catch (error) {
    console.error("Image generation failed: ", error);
    return [];
  }
};

export default generateImages;
