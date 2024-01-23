import * as faceapi from 'face-api.js';

const MODEL_URL = './assets/weights';

export async function loadModels() {
  await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
  await faceapi.loadFaceLandmarkModel(MODEL_URL);
  await faceapi.loadFaceRecognitionModel(MODEL_URL);
}
