import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
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
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.recordButton, recording ? styles.recording : null]}
        onPress={recording ? stopRecording : startRecording}
        disabled={transcribing}
      >
        {transcribing ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{recording ? '■' : '●'}</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.statusText}>
        {transcribing
          ? 'Transcribing...'
          : recording
          ? 'Recording... Tap to stop.'
          : 'Tap to record voice'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 16,
  },
  recordButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1976d2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#1976d2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 3,
    borderColor: '#fff',
  },
  recording: {
    backgroundColor: '#d32f2f',
    borderColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  statusText: {
    color: '#1976d2',
    fontSize: 15,
    marginTop: 2,
    textAlign: 'center',
  },
});
