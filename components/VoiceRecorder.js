import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import { Audio } from 'expo-av';
import whisperService from '../services/whisperService';

export default function VoiceRecorder({ onTranscription }) {
  const [recording, setRecording] = useState();
  const [transcribing, setTranscribing] = useState(false);

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();

    setTranscribing(true);
    const transcription = await whisperService.transcribeAudio(uri);
    setTranscribing(false);

    onTranscription(transcription);
  }

  return (
    <View style={{ margin: 20 }}>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      {transcribing && <Text>Transcribing...</Text>}
    </View>
  );
}
