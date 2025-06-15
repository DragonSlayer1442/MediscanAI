import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import gptService from '../services/gptService';
import visionService from '../services/visionService';
import generateImages from '../services/imageService';


export default function SymptomInput({ route, navigation }) {
  const image = route?.params?.image ?? null;
  const { name = '', birthday = '' } = route.params ?? {};
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [visionLabels, setVisionLabels] = useState('');

const analyze = async () => {
    setLoading(true);

    try {
      let visionResult = '';
      if (image) {
        visionResult = await visionService.analyzeImage(image);
        setVisionLabels(visionResult);
      }

      const result = await gptService.analyzeCase(symptoms, visionResult ?? ' ');
      // Generate images based on GPT result (simplest way: we use symptoms as prompt)
      const images = await generateImages(symptoms);
      navigation.navigate('Result', { result, images , name , birthday});
    } catch (error) {
      console.error('Error during analysis:', error);
      alert("An error occurred during analysis.");
    }
    setLoading(false);
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

      {loading ? (
  <View style={styles.loadingBox}>
    <ActivityIndicator size="large" color="#1976d2" />
    <Text style={styles.loadingText}>Analyzing your data...</Text>
  </View>
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
    flexGrow: 1,
    backgroundColor: '#f6fbff',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 80, // add some top padding
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 14,
    color: '#1976d2',
    letterSpacing: 0.5,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#b3e5fc',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    minHeight: 120,
    marginBottom: 18,
    fontSize: 16,
    shadowColor: '#1976d2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  visionBox: {
    marginTop: 24,
    padding: 14,
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
    width: '100%',
    shadowColor: '#1976d2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  visionTitle: {
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 4,
  },
  loadingBox: {
  marginTop: 20,
  alignItems: 'center',
},
loadingText: {
  marginTop: 10,
  fontSize: 16,
  color: '#1976d2',
  fontWeight: '500',
},

});
