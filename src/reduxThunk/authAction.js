import {
  authToken,
  customerLoginRequest,
  customerLoginSuccess,
  customerLoginError,
} from './Type';
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
      userId: userId,
      password: password,
    };

    axios
      .post('http://139.59.58.151:8000/userlogin', params, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then(async response => {
        console.log(response.data);
        const token = response.data.token;
        const details = response.data;

        if (token && details) {
          // Check if the role is customer
          if (response.data.role === 'kariger') {
            dispatch({type: authToken, payload: token});
            // Storing token to AsyncStorage
            try {
              await AsyncStorage.setItem('@AuthToken', token);
            } catch (error) {
              console.error('AsyncStorage error:', error);
            }
            dispatch(customerLogin_Success(details));
          } else {
            // Handle the case where the role is not customer
            Alert.alert('Login Failed', 'Invalid role, please retry');
          }
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

export const customerLogout = () => dispatch => {
  dispatch({
    type: authToken,
    payload: null,
  });

  AsyncStorage.removeItem('@AuthToken');
};

// http://139.59.58.151:8000/adminlogin
// JSON Content
// {
//   "userId" : "ngjewel", "password" : "ng_info"
// }
// multipart/form-data
// {
//   "category" : "", "image" : "", "description" : "", "quantity" : "", "size" : "", "weight" : "", "tunch" :  ""
// }

// http://139.59.58.151:8000/userlogin
// JSON Content
// {
//   "userId" : "user666", "password" : "user666"
// }
