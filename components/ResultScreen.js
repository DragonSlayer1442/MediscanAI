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
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
  },
  result: {
    fontSize: 16,
    marginBottom: 30,
  },
});
