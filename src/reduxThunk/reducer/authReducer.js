import {
  authToken,
  customerLoginError,
  customerLoginSuccess,
  customerLoginRequest,
} from '../Type';

const loginInitialState = {
  loading: false,
  details: {},
  error: '',
  token: null,
};

export const reducerLogin = (state = loginInitialState, action) => {
  switch (action.type) {
    case authToken:
      return {
        ...state,
        token: action.payload,
      };
    case customerLoginRequest:
      return {
        ...state,
        loading: true,
      };
    case customerLoginSuccess:
      return {
        ...state,
        loading: false,
        details: action.payload,
      };
    case customerLoginError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
