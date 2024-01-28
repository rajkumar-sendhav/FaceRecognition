import {addImgDetailsRequest} from '../Type';

export const addCapturedImage = (imageUri, name, panNo) => ({
  type: addImgDetailsRequest,
  payload: {imageUri, name, panNo},
});
