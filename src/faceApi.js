import * as faceapi from 'face-api.js';

const MODELS_URL = './assets/weights';

export async function loadModels() {
  await faceapi.nets.tinyFaceDetector.loadFromUri(MODELS_URL);
  await faceapi.nets.faceLandmark68Net.loadFromUri(MODELS_URL);
  await faceapi.nets.faceRecognitionNet.loadFromUri(MODELS_URL);
}
