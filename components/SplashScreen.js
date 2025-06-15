import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function SplashScreen({ navigation }) {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        navigation.replace('PatientInfo');
      }, 1000);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, { opacity }]}>MediScan AI</Animated.Text>
      <Text style={styles.subtitle}>Your AI Medical Assistant</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1976d2',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '15%',
  },
  title: {
    fontSize: 42,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginTop: 20,
  },
});
