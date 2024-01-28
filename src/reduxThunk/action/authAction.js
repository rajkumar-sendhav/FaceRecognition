import {
  authToken,
  customerLoginRequest,
  customerLoginSuccess,
  customerLoginError,
} from '../Type';
import axios from 'axios';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthFunction = () => dispatch => {
  dispatch({
    type: authToken,
    payload: 's',
  });
};

const customerLogin_Request = () => {
  return {
    type: customerLoginRequest,
  };
};
const customerLogin_Success = details => {
  return {
    type: customerLoginSuccess,
    payload: details,
  };
};
const customerLogin_Error = err => {
  return {
    type: customerLoginError,
    payload: err,
  };
};

export const customerLogin = (userId, password) => {
  return function (dispatch) {
    dispatch(customerLogin_Request());

    let params = {
      email: userId,
      password: password,
    };

    axios
      .post('http://64.227.162.41:5000/user/signin', params, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then(async response => {
        // console.log(response.data);
        const token = response.data.user.token;
        // console.log('Token :', token);
        const details = response.data;

        if (token && details) {
          dispatch({type: authToken, payload: token});
          // Storing token to AsyncStorage
          try {
            await AsyncStorage.setItem('@AuthToken', token);
          } catch (error) {
            console.error('AsyncStorage error:', error);
          }
          dispatch(customerLogin_Success(details));
        } else {
          Alert.alert(
            'Login Failed',
            'Enter valid User Id & Password, please retry',
          );
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(customerLogin_Error(err));
        Alert.alert('Login Failed', 'Network error Please retry');
      });
  };
};

//  Logout Action Creator
export const customerLogout = () => dispatch => {
  dispatch({
    type: authToken,
    payload: null,
  });

  AsyncStorage.removeItem('@AuthToken');
};
