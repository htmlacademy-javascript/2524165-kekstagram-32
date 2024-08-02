import { ImageScaleParameters as parameters } from './constants.js';

const imgUploadScaleElement = document.querySelector('.img-upload__scale');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const scaleControlValue = imgUploadScaleElement.querySelector('.scale__control--value');
const scaleControlSmaller = imgUploadScaleElement.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadScaleElement.querySelector('.scale__control--bigger');

scaleControlSmaller.addEventListener('click', onScaleControlSmallerButtonClick);
scaleControlBigger.addEventListener('click', onScaleControlBiggerButtonClick);

function onScaleControlSmallerButtonClick () {
  const value = parseInt(scaleControlValue.value, 10);
  if (value !== parameters.IMAGE_SCALE_MIN) {
    const newValue = value - parameters.IMAGE_SCALE_STEP;
    imgUploadPreview.style.transform = `scale(${newValue / 100.0})`;
    scaleControlValue.value = `${newValue}%`;
  }
}

function onScaleControlBiggerButtonClick () {
  const value = parseInt(scaleControlValue.value, 10);
  if (value !== parameters.IMAGE_SCALE_MAX) {
    const newValue = value + parameters.IMAGE_SCALE_STEP;
    imgUploadPreview.style.transform = `scale(${newValue / 100.0})`;
    scaleControlValue.value = `${newValue}%`;
  }
}

function resetScale () {
  imgUploadPreview.style.transform = `scale(${parameters.IMAGE_SCALE_MAX / 100.0})`;
  scaleControlValue.value = `${parameters.IMAGE_SCALE_MAX}%`;
}

export { resetScale };
