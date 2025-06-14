import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import gptService from '../services/gptService';
import visionService from '../services/visionService';
import VoiceRecorder from './VoiceRecorder';

export default function SymptomInput({ route, navigation }) {
  const { image } = route.params;
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [visionLabels, setVisionLabels] = useState('');

  const analyze = async () => {
    setLoading(true);

    try {
      // First analyze image using Vision API
      const visionResult = await visionService.analyzeImage(image);
      setVisionLabels(visionResult);

      // Then combine vision result and symptoms with GPT
      const result = await gptService.analyzeCase(symptoms, visionResult);

      // Navigate to result screen
      navigation.navigate('Result', { result });

    } catch (error) {
      console.error('Error during analysis:', error);
      alert("An error occurred during analysis.");
    }

    setLoading(false);
  };

  const handleVoiceInput = (transcription) => {
    setSymptoms(prev => prev + ' ' + transcription);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Describe Symptoms:</Text>

      <TextInput
        placeholder="Type symptoms here..."
        multiline
        style={styles.input}
        onChangeText={setSymptoms}
        value={symptoms}
      />

      <VoiceRecorder onTranscription={handleVoiceInput} />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Analyze" onPress={analyze} />
      )}

      {visionLabels ? (
        <View style={styles.visionBox}>
          <Text style={styles.visionTitle}>Vision AI Detected:</Text>
          <Text>{visionLabels}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    borderRadius: 5,
    minHeight: 150,
    marginBottom: 20,
  },
  visionBox: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#eef',
    borderRadius: 5,
  },
  visionTitle: {
    fontWeight: 'bold',
  }
});
