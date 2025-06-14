import axios from 'axios';
import * as FileSystem from 'expo-file-system';

const OPENAI_API_KEY = 'xxxx';

const whisperService = {
  transcribeAudio: async (fileUri) => {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const formData = new FormData();
    formData.append('file', {
      uri: fileUri,
      name: 'audio.m4a',
      type: 'audio/m4a',
    });
    formData.append('model', 'whisper-1');
    formData.append('response_format', 'text');

    const response = await axios.post(
      'https://api.openai.com/v1/audio/transcriptions',
      formData,
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data.text;
  },
};

export default whisperService;
