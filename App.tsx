import React from 'react';
import {SafeAreaView} from 'react-native';
import CameraScreen from './src/CameraScreen';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CameraScreen />
    </SafeAreaView>
  );
};

export default App;
