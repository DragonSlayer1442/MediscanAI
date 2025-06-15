import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image } from 'react-native';
import pdfService from '../services/pdfService';

export default function ResultScreen({ route }) {
  const { result, images = [], name, birthday } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Analysis Result</Text>
      <Text style={styles.result}>{result}</Text>

      {images.length > 0 && (
        <>
          <Text style={styles.title}>Generated Image:</Text>
          {images.map((url, idx) => (
            <Image key={idx} source={{ uri: url }} style={styles.image} />
          ))}
        </>
      )}

      <Button title="Export PDF" onPress={() => pdfService.exportPDF(result, images , name , birthday)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    justifyContent: 'flex-start', // change from center to top
    paddingTop: 80, // add some top padding
    alignItems: 'center',
    backgroundColor: '#f6fbff',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  image: {
  width: 250,
  height: 250,
  marginVertical: 10,
  borderRadius: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 18,
    color: '#1976d2',
    letterSpacing: 0.5,
  },
  resultBox: {
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
    width: '100%',
    shadowColor: '#1976d2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  resultText: {
    fontSize: 16,
    color: '#333',
  },
});
