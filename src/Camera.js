import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import * as faceapi from 'face-api.js';
import {loadModels} from './faceApi';

const Camera = () => {
  const [cameraRef, setCameraRef] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const {status} = await RNCamera.requestCameraPermissions();
      setHasPermission(status === 'granted');

      await loadModels();
    })();
  }, []);

  const handleCapture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setImage(photo.uri);
    }
  };

  const handleFaceDetection = async imageUri => {
    const image = await faceapi.fetchImage(imageUri);
    const detections = await faceapi
      .detectAllFaces(image, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
    console.log(detections);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <RNCamera
        ref={ref => setCameraRef(ref)}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        captureAudio={false}>
        <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
          <Text style={styles.captureButtonText}>CAPTURE</Text>
        </TouchableOpacity>
      </RNCamera>
      {image && (
        <TouchableOpacity
          style={styles.processButton}
          onPress={() => handleFaceDetection(image)}>
          <Text style={styles.processButtonText}>PROCESS</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
  },
  captureButton: {
    flex: 0.1,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignSelf: 'center',
    padding: 10,
  },
  captureButtonText: {
    fontSize: 14,
    color: 'black',
  },
  processButton: {
    flex: 0.05,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignSelf: 'center',
    padding: 10,
    marginTop: 10,
  },
  processButtonText: {
    fontSize: 14,
    color: 'black',
  },
});

export default Camera;
