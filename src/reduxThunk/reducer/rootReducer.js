import {combineReducers} from 'redux';
import {reducerLogin} from './authReducer';
import {imgReducer} from './imgDetailsReducer';

export default combineReducers({
  login: reducerLogin,
  imgDetails: imgReducer,
});
