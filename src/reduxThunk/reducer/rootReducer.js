import {combineReducers} from 'redux';
import {reducerLogin} from './authReducer';

export default combineReducers({
  login: reducerLogin,
});
