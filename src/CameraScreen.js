import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import cameraFlip from './assets/icons/flip.png';
import capturePlus from './assets/icons/plus.png';
import minus from './assets/icons/minus.png';
import magnifyingGlass from './assets/icons/magnifying-glass.png';
import BottomSheet from 'react-native-simple-bottom-sheet';
import Modal from 'react-native-modal';

const CameraScreen = () => {
  const [cameraType, setCameraType] = useState('back');
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState('');
  const [name, setName] = useState('');

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
      // bottomSheetRef.current.close();
    }
  };

  const handleModalOKPress = () => {
    // Handle the OK button press
    console.log('Name:', name);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.cameraPreview}
        type={cameraType}
        captureAudio={false}>
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
              <View style={{borderBottomWidth: 1}} />
              <View style={styles.bottomSheetContainer}>
                <Text style={styles.title}>Threads</Text>
                <View
                  style={{
                    borderWidth: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: 5,
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
              <View style={{borderBottomWidth: 1}} />
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
            </ScrollView>
          </>
        )}
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  cameraPreview: {
    flex: 1,
  },
  controlsContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 20,
  },
  controlButton: {
    backgroundColor: '#5D8AA8',
    borderRadius: 50,
    padding: 15,
    position: 'absolute',
  },
  controlButtonText: {
    color: 'white',
    fontSize: 18,
  },
  controlButtonIcon: {
    width: 22,
    height: 22,
    tintColor: '#fff',
  },
  captureButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomSheetContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#000',
    textAlign: 'center',
    paddingVertical: 5,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'gray',
  },
  modalImage: {
    width: 150,
    height: 150,
    // borderRadius: 75,
    marginBottom: 20,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '90%',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#5D8AA8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CameraScreen;
