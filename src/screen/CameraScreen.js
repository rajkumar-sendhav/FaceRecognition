import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import styles from './CameraStyle';
import CameraControls from '../components/Camera/CameraControls';
import CameraModal from '../components/Camera/CameraModal';
import BottomSheetContent from '../components/BottomSheet/BottomSheetContent';
import {RNCamera} from 'react-native-camera';
import BottomSheet from 'react-native-simple-bottom-sheet';
import {connect} from 'react-redux';
import {customerLogout} from '../reduxThunk/action/authAction';
import {addCapturedImage} from '../reduxThunk/action/imgDetailsAction';
import axios from 'axios';

const CameraScreen = ({
  customerLogout,
  details,
  addCapturedImage,
  capturedImages,
}) => {
  const [cameraType, setCameraType] = useState('front');
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [box, setBox] = useState(null);
  const [panNo, setPanNo] = useState('');

  const cameraRef = useRef(null);
  const bottomSheetRef = useRef(null);

  const handleCameraTypePress = () => {
    setCameraType(cameraType === 'back' ? 'front' : 'back');
  };

  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log('Photo taken:', photo.uri);
      setImage(photo.uri);
      setModalVisible(true);
    }
  };

  const handleModalOKPress = async () => {
    try {
      const panNumber = panNo;
      const response = await axios.post(
        'http://64.227.162.41:5000/user/verity-pan-no',
        {
          panNo: panNumber,
        },
      );

      // Parse the JSON response
      // console.log('Result: ', response.data);

      if (response.data.status) {
        Alert.alert('PAN card verification successful.');
        console.log('Name:', name);
        console.log('Pan Number:', panNo);
        setModalVisible(false);
        // Dispatch Redux action to store captured image, name and panNo
        addCapturedImage(image, name, panNo);
        setName('');
        setPanNo('');
      } else {
        Alert.alert('PAN card not found. Verification unsuccessful.');
      }
    } catch (error) {
      console.error('Error during PAN verification:', error.message);
      Alert.alert('Error during PAN verification. Please try again.');
    }
  };

  const handlerFace = ({faces}) => {
    if (faces[0]) {
      if (image && faces[0].bounds.size.width > 0) {
        // Compare the detected face with the saved user's image
        // If they match, display a green box with the saved name
        setBox({
          boxs: {
            width: faces[0].bounds.size.width,
            height: faces[0].bounds.size.height,
            x: faces[0].bounds.origin.x,
            y: faces[0].bounds.origin.y,
            yawAngle: faces[0].yawAngle,
            rollAngle: faces[0].rollAngle,
          },
          rightEyePosition: faces[0].rightEyePosition,
          leftEyePosition: faces[0].leftEyePosition,
          bottomMounthPosition: faces[0].bottomMounthPosition,
          name: name,
        });
      } else {
        setBox({
          boxs: {
            width: faces[0].bounds.size.width,
            height: faces[0].bounds.size.height,
            x: faces[0].bounds.origin.x,
            y: faces[0].bounds.origin.y,
            yawAngle: faces[0].yawAngle,
            rollAngle: faces[0].rollAngle,
          },
          rightEyePosition: faces[0].rightEyePosition,
          leftEyePosition: faces[0].leftEyePosition,
          bottomMounthPosition: faces[0].bottomMounthPosition,
        });
      }
    } else {
      setBox(null);
    }
  };

  const handleLogout = () => {
    // Show an alert when Log Out button is pressed
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => customerLogout(),
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.cameraPreview}
        type={cameraType}
        captureAudio={false}
        onFacesDetected={handlerFace}
        faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value for transparency
            padding: 30,
            width: 'auto',
          }}
        />
        <CameraControls
          handleCameraTypePress={handleCameraTypePress}
          handleCapture={handleCapture}
        />
      </RNCamera>
      {box && (
        <>
          {box.name && <Text style={styles.nameText}>{box.name}</Text>}
          <View
            style={[
              styles.bound({
                width: box.boxs.width,
                height: box.boxs.height,
                x: box.boxs.x,
                y: box.boxs.y,
              }),
              box.name && {borderColor: 'green'},
            ]}
          />
        </>
      )}
      <CameraModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        image={image}
        name={name}
        setName={setName}
        panNo={panNo}
        setPanNo={setPanNo}
        handleModalOKPress={handleModalOKPress}
      />

      <View style={{height: '28%', backgroundColor: '#000'}} />

      <BottomSheet ref={bottomSheetRef} isOpen={false}>
        {onScrollEndDrag => (
          <BottomSheetContent
            onScrollEndDrag={onScrollEndDrag}
            handleLogout={handleLogout}
          />
        )}
      </BottomSheet>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.loading,
    details: state.login.details,
    error: state.error,
    capturedImages: state.capturedImages,
  };
};

const mapDispatchToProps = {
  customerLogout,
  addCapturedImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);
