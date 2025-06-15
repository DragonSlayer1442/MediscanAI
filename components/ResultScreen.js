import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import pdfService from '../services/pdfService';

export default function ResultScreen({ route }) {
  const { result } = route.params;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Analysis Result</Text>
      <Text style={styles.result}>{result}</Text>
      <Button title="Export PDF" onPress={() => pdfService.exportPDF(result)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 18,
    color: '#388e3c',
    letterSpacing: 0.5,
  },
  result: {
    fontSize: 17,
    marginBottom: 32,
    backgroundColor: '#e8f5e9',
    borderRadius: 12,
    padding: 18,
    color: '#222',
    width: '100%',
    shadowColor: '#388e3c',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
});
