import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import Camera from './src/Camera';
import CameraScreen from './src/CameraScreen';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <Camera /> */}
      {/* <Text>Wel-Come to Face Recognition</Text> */}
      <CameraScreen />
    </SafeAreaView>
  );
};

export default App;
