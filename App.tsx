import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import CameraScreen from './src/CameraScreen';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <CameraScreen />
    </SafeAreaView>
  );
};

export default App;
