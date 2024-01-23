import {StyleSheet} from 'react-native';

export default StyleSheet.create({
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
