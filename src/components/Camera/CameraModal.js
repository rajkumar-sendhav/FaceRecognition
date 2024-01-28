import React from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import styles from '../../screen/CameraStyle';

const CameraModal = ({
  modalVisible,
  setModalVisible,
  image,
  name,
  setName,
  panNo,
  setPanNo,
  handleModalOKPress,
}) => {
  return (
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
        <TextInput
          style={styles.modalInput}
          placeholder="Enter Pan number"
          value={panNo}
          onChangeText={text => setPanNo(text)}
        />
        <TouchableOpacity
          style={styles.modalButton}
          onPress={handleModalOKPress}>
          <Text style={styles.modalButtonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CameraModal;
