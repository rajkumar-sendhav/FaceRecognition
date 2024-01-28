import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#696969',
  },
  image: {
    top: '20%',
    height: 150,
    // borderRadius: 75,
    alignSelf: 'center',
    width: 200,
    resizeMode: 'contain',
    marginBottom: 50,
  },

  wrapper: {
    width: '85%',
  },
  input: {
    flex: 1,
    fontSize: 22,
    textAlign: 'center',
    color: '#000000',
  },
  bottomView: {
    // backgroundColor: '#fff',
    opacity: 0.95,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    paddingBottom: 40,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 24,
    // marginTop: 12,
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
  },
  inputView: {
    // height: 50,
    padding: 0,
    backgroundColor: '#f1f3f6',
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#5D8AA8',
    paddingVertical: 10,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 16,
  },
});
