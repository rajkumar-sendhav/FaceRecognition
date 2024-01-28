import React from 'react';
import {TouchableOpacity, Image, Text} from 'react-native';
import styles from '../../screen/CameraStyle';
import cameraFlip from '../../assets/icons/flip.png';
import capturePlus from '../../assets/icons/plus.png';

const CameraControls = ({handleCameraTypePress, handleCapture}) => {
  return (
    <>
      <TouchableOpacity
        style={[
          styles.controlButton,
          {
            left: 20,
            top: 20,
          },
        ]}
        onPress={handleCameraTypePress}>
        <Image source={cameraFlip} style={styles.controlButtonIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.controlButton,
          {
            right: 20,
            top: 20,
          },
        ]}
        onPress={handleCapture}>
        <Image source={capturePlus} style={styles.controlButtonIcon} />
      </TouchableOpacity>
    </>
  );
};

export default CameraControls;
