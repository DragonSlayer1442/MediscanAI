import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function WelcomeScreen({ route , navigation }) {
  
  const { name = '', birthday = '' } = route.params ?? {};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MediScanAI</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Camera',  { name, birthday })}
      >
        <Text style={styles.buttonText}>Take Picture & Analyze</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SymptomInput', { image: null , name , birthday })}
      >
        <Text style={styles.buttonText}>Continue Without Image</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10141A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    color: '#1976d2',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#1e90ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
