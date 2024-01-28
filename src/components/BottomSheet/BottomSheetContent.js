import React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import styles from '../../screen/CameraStyle';
import magnifyingGlass from '../../assets/icons/magnifying-glass.png';
import capturePlus from '../../assets/icons/plus.png';
import minus from '../../assets/icons/minus.png';

const BottomSheetContent = ({onScrollEndDrag, handleLogout}) => {
  return (
    <>
      <TouchableOpacity
        style={[
          styles.controlButton,
          {
            right: 20,
            top: -80,
          },
        ]}>
        <Image source={magnifyingGlass} style={styles.controlButtonIcon} />
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
  );
};

export default BottomSheetContent;
