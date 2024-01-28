import {addImgDetailsRequest} from '../Type';

const initialState = {
  capturedImages: [],
};

export const imgReducer = (state = initialState, action) => {
  switch (action.type) {
    case addImgDetailsRequest:
      return {
        ...state,
        capturedImages: [
          ...state.capturedImages,
          {
            imageUri: action.payload.imageUri,
            name: action.payload.name,
            panNo: action.payload.panNo,
          },
        ],
      };
    default:
      return state;
  }
};
