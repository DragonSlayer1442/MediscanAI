import axios from 'axios';
import * as FileSystem from 'expo-file-system';

const GOOGLE_VISION_API_KEY = 'xxxxxx';

const visionService = {
  analyzeImage: async (uri) => {
    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });

    const body = {
      requests: [
        {
          image: { content: base64 },
          features: [{ type: 'LABEL_DETECTION', maxResults: 5 }],
        },
      ],
    };

    const res = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`,
      body,
      { headers: { 'Content-Type': 'application/json' } }
    );

    const labels = res.data.responses[0].labelAnnotations.map(label => label.description).join(', ');
    return labels;
  }
};

export default visionService;
