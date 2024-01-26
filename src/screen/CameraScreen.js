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
import {RNCamera} from 'react-native-camera';
import cameraFlip from '../assets/icons/flip.png';
import capturePlus from '../assets/icons/plus.png';
import minus from '../assets/icons/minus.png';
import magnifyingGlass from '../assets/icons/magnifying-glass.png';
import BottomSheet from 'react-native-simple-bottom-sheet';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {customerLogout} from '../reduxThunk/authAction';

const CameraScreen = ({customerLogout, details}) => {
  const [cameraType, setCameraType] = useState('back');
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [box, setBox] = useState(null);
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');

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
      setUserImage(photo.uri);
      setUserName('');
      setModalVisible(true);
    }
  };

  const handleModalOKPress = () => {
    // Handle the OK button press
    console.log('Name:', name);
    setUserName(name);
    setModalVisible(false);
  };

  const handlerFace = ({faces}) => {
    if (faces[0]) {
      if (userImage && faces[0].bounds.size.width > 0) {
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
          name: userName,
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

      <View style={{height: '28%', backgroundColor: '#000'}} />

      <BottomSheet ref={bottomSheetRef} isOpen={false}>
        {onScrollEndDrag => (
          <>
            <TouchableOpacity
              style={[
                styles.controlButton,
                {
                  right: 20,
                  top: -80,
                },
              ]}>
              <Image
                source={magnifyingGlass}
                style={styles.controlButtonIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.controlButton,
                {
                  top: -50,
                },
              ]}
              onPress={handleLogout}>
              <Text style={styles.modalButtonText}>LogOut</Text>
            </TouchableOpacity>
            <ScrollView onScrollEndDrag={onScrollEndDrag}>
              <View style={styles.bottomSheetContainer}>
                <Text style={styles.title}>Frame</Text>
                <Text style={styles.title}>640x480</Text>
              </View>
              <View style={styles.bottomSheetContainer}>
                <Text style={styles.title}>Crop</Text>
                <Text style={styles.title}>240x320</Text>
              </View>
              <View style={styles.bottomSheetContainer}>
                <Text style={styles.title}>Inference Time</Text>
                <Text style={styles.title}>0ms</Text>
              </View>
              <View style={{borderBottomWidth: 1, borderColor: 'gray'}} />
              <View style={styles.bottomSheetContainer}>
                <Text style={styles.title}>Threads</Text>
                <View
                  style={{
                    borderWidth: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: 5,
                    borderColor: 'gray',
                  }}>
                  <TouchableOpacity style={{padding: 5}}>
                    <Image
                      source={minus}
                      style={[styles.controlButtonIcon, {tintColor: '#000'}]}
                    />
                  </TouchableOpacity>
                  <Text style={styles.title}> 1 </Text>
                  <TouchableOpacity style={{padding: 5}}>
                    <Image
                      source={capturePlus}
                      style={[styles.controlButtonIcon, {tintColor: '#000'}]}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{borderBottomWidth: 1, borderColor: 'gray'}} />
            </ScrollView>
          </>
        )}
      </BottomSheet>

      <Modal
        isVisible={modalVisible}
        style={{margin: 20}}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add Face</Text>
          <Image source={{uri: image}} style={styles.modalImage} />
          <TextInput
            style={styles.modalInput}
            placeholder="Enter name"
            value={name}
            onChangeText={text => setName(text)}
          />
          <TouchableOpacity
            style={styles.modalButton}
            onPress={handleModalOKPress}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.loading,
    details: state.login.details,
    error: state.error,
  };
};

const mapDispatchToProps = {
  customerLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);
