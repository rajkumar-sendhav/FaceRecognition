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

// import React, {useRef, useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Dimensions,
//   SafeAreaView,
//   Image,
//   ScrollView,
//   TextInput,
// } from 'react-native';
// import styles from './CameraStyle';
// import {RNCamera} from 'react-native-camera';
// import cameraFlip from './assets/icons/flip.png';
// import capturePlus from './assets/icons/plus.png';
// import minus from './assets/icons/minus.png';
// import magnifyingGlass from './assets/icons/magnifying-glass.png';
// import BottomSheet from 'react-native-simple-bottom-sheet';
// import Modal from 'react-native-modal';

// const CameraScreen = () => {
//   const [cameraType, setCameraType] = useState('back');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [image, setImage] = useState('');
//   const [name, setName] = useState('');

//   const cameraRef = useRef(null);
//   const bottomSheetRef = useRef(null);

//   const handleCameraTypePress = () => {
//     setCameraType(cameraType === 'back' ? 'front' : 'back');
//   };

//   const handleCapture = async () => {
//     if (cameraRef.current) {
//       const photo = await cameraRef.current.takePictureAsync();
//       console.log('Photo taken:', photo.uri);
//       setImage(photo.uri);
//       setModalVisible(true);
//       // bottomSheetRef.current.close();
//     }
//   };

//   const handleModalOKPress = () => {
//     // Handle the OK button press
//     console.log('Name:', name);
//     setModalVisible(false);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <RNCamera
//         ref={cameraRef}
//         style={styles.cameraPreview}
//         type={cameraType}
//         captureAudio={false}>
//         <View
//           style={{
//             backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value for transparency
//             padding: 30,
//             width: 'auto',
//           }}
//         />
//         <TouchableOpacity
//           style={[
//             styles.controlButton,
//             {
//               left: 20,
//               top: 20,
//             },
//           ]}
//           onPress={handleCameraTypePress}>
//           <Image source={cameraFlip} style={styles.controlButtonIcon} />
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.controlButton,
//             {
//               right: 20,
//               top: 20,
//             },
//           ]}
//           onPress={handleCapture}>
//           <Image source={capturePlus} style={styles.controlButtonIcon} />
//         </TouchableOpacity>
//       </RNCamera>

//       <View style={{height: '28%', backgroundColor: '#000'}} />

//       <BottomSheet ref={bottomSheetRef} isOpen={false}>
//         {onScrollEndDrag => (
//           <>
//             <TouchableOpacity
//               style={[
//                 styles.controlButton,
//                 {
//                   right: 20,
//                   top: -80,
//                 },
//               ]}>
//               <Image
//                 source={magnifyingGlass}
//                 style={styles.controlButtonIcon}
//               />
//             </TouchableOpacity>
//             <ScrollView onScrollEndDrag={onScrollEndDrag}>
//               <View style={styles.bottomSheetContainer}>
//                 <Text style={styles.title}>Frame</Text>
//                 <Text style={styles.title}>640x480</Text>
//               </View>
//               <View style={styles.bottomSheetContainer}>
//                 <Text style={styles.title}>Crop</Text>
//                 <Text style={styles.title}>240x320</Text>
//               </View>
//               <View style={styles.bottomSheetContainer}>
//                 <Text style={styles.title}>Inference Time</Text>
//                 <Text style={styles.title}>0ms</Text>
//               </View>
//               <View style={{borderBottomWidth: 1, borderColor: 'gray'}} />
//               <View style={styles.bottomSheetContainer}>
//                 <Text style={styles.title}>Threads</Text>
//                 <View
//                   style={{
//                     borderWidth: 1,
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     margin: 5,
//                     borderColor: 'gray',
//                   }}>
//                   <TouchableOpacity style={{padding: 5}}>
//                     <Image
//                       source={minus}
//                       style={[styles.controlButtonIcon, {tintColor: '#000'}]}
//                     />
//                   </TouchableOpacity>
//                   <Text style={styles.title}> 1 </Text>
//                   <TouchableOpacity style={{padding: 5}}>
//                     <Image
//                       source={capturePlus}
//                       style={[styles.controlButtonIcon, {tintColor: '#000'}]}
//                     />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//               <View style={{borderBottomWidth: 1, borderColor: 'gray'}} />
//             </ScrollView>
//           </>
//         )}
//       </BottomSheet>

//       <Modal
//         isVisible={modalVisible}
//         style={{margin: 20}}
//         onBackdropPress={() => setModalVisible(false)}>
//         <View style={styles.modalContainer}>
//           <Text style={styles.modalTitle}>Add Face</Text>
//           <Image source={{uri: image}} style={styles.modalImage} />
//           <TextInput
//             style={styles.modalInput}
//             placeholder="Enter name"
//             value={name}
//             onChangeText={text => setName(text)}
//           />
//           <TouchableOpacity
//             style={styles.modalButton}
//             onPress={handleModalOKPress}>
//             <Text style={styles.modalButtonText}>OK</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// export default CameraScreen;
