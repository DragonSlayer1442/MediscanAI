import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
      navigation.navigate('SymptomInput', { image: photo.uri });
    }
  }

  if (hasPermission === null) {
    return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
  }
  if (hasPermission === false) {
    return <View style={styles.container}><Text>No access to camera. Please enable camera permissions.</Text></View>;
  }

  return (
    <View style={styles.container}>
      {!photoUri ? (
        <>
          <Camera 
            style={styles.camera} 
            ref={cameraRef} 
            type={type}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              )}
            >
              <Text style={styles.buttonText}>Flip Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Image source={{ uri: photoUri }} style={styles.preview} />
          <TouchableOpacity style={styles.button} onPress={() => setPhotoUri(null)}>
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#000' 
  },
  camera: { 
    width: '100%', 
    height: '70%' 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: '#1e90ff',
    borderRadius: 8,
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 18 
  },
  preview: { 
    width: '100%', 
    height: '70%' 
  },
});
