import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function PatientInfoScreen({ navigation }) {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleStart = () => {
    if (name && birthday) {
      navigation.navigate('Welcome', { name, birthday });
    } else {
      alert('Please enter both name and birthday.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Patient Info</Text>
      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Birthday (YYYY-MM-DD)"
        value={birthday}
        onChangeText={setBirthday}
        style={styles.input}
      />
      <Button title="Continue" onPress={handleStart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6fbff',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 20,
    color: '#1976d2',
  },
  input: {
    borderWidth: 1,
    borderColor: '#1976d2',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
});
