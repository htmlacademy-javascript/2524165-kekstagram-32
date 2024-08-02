import { BUTTON_CLOSE_MODULE_WINDOW, IMAGE_DESCRIPTION_MAX_LENGTH } from './constants.js';
import { resetScale } from './upload-image-scale.js';
import { initEffect, resetEffect } from './upload-image-effects.js';

const imgUploadElement = document.querySelector('.img-upload');
const imgUploadForm = imgUploadElement.querySelector('.img-upload__form');
const imgUploadOverlay = imgUploadElement.querySelector('.img-upload__overlay');
const imgUploadOverlayCloseButton = imgUploadOverlay.querySelector('.img-upload__cancel');
const imgUploadInput = imgUploadElement.querySelector('.img-upload__input');
const imgHashTagsInput = imgUploadElement.querySelector('.text__hashtags');
const imgDescriptionInput = imgUploadElement.querySelector('.text__description');

const regExpPattern = /^#[a-zа-яё0-9]{1,19}$/i;

initEffect();

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});
pristine.addValidator(imgHashTagsInput, validateHashTags, getHashTagsError);
pristine.addValidator(imgDescriptionInput, validateDescription, getDescriptionError);

function validateHashTags () {
  const hashTagsStr = imgHashTagsInput.value.replace(/\s+/g, ' ').trim().toLowerCase();
  if (!hashTagsStr) {
    return true;
  }
  const hashTagsArr = hashTagsStr.split(' ');
  const uniqueHashTagsSet = new Set(hashTagsArr);
  if (hashTagsArr.length > 5 || hashTagsArr.length !== uniqueHashTagsSet.size) {
    return false;
  }
  for (let i = 0; i < hashTagsArr.length; i++) {
    if (!hashTagsArr[i].match(regExpPattern)) {
      return false;
    }
  }
  return true;
}

function validateDescription () {
  return imgDescriptionInput.value.length <= IMAGE_DESCRIPTION_MAX_LENGTH;
}

function getHashTagsError () {
  const hashTagsStr = imgHashTagsInput.value.replace(/\s+/g, ' ').trim().toLowerCase();
  const hashTagsArr = hashTagsStr.split(' ');
  const uniqueHashTagsSet = new Set(hashTagsArr);
  if (hashTagsArr.length > 5) {
    return 'Превышено допустимое количество хэштегов.';
  }
  if (hashTagsArr.length !== uniqueHashTagsSet.size) {
    return 'Хэштеги повторяются.';
  }
  return 'Введён невалидный хештег.';
}

function getDescriptionError () {
  return 'Длина комментария больше 140 символов.';
}

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

imgUploadInput.addEventListener('change', onImgUploadInputChange);
imgHashTagsInput.addEventListener('focus', onImgHashTagsInputFocus);
imgHashTagsInput.addEventListener('blur', onImgHashTagsInputBlur);
imgDescriptionInput.addEventListener('focus', onImgDescriptionInputFocus);
imgDescriptionInput.addEventListener('blur', onImgDescriptionInputBlur);

function onImgUploadInputChange () {
  imgUploadOverlayCloseButton.addEventListener('click', onImgUploadOverlayCloseButtonClick);
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.body.addEventListener('keydown', onDocumentKeydown);
}

function closeModal () {
  imgUploadInput.value = '';
  imgUploadOverlay.classList.add('hidden');
  imgUploadOverlayCloseButton.removeEventListener('click', onImgUploadOverlayCloseButtonClick);
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetScale();
  resetEffect();
}

function onImgUploadOverlayCloseButtonClick () {
  closeModal();
}

function onDocumentKeydown (evt) {
  if (evt.key === BUTTON_CLOSE_MODULE_WINDOW) {
    evt.preventDefault();
    closeModal();
  }
}

function onImgHashTagsInputFocus () {
  imgHashTagsInput.addEventListener('keydown', onInputKeydown);
}

function onImgHashTagsInputBlur () {
  imgHashTagsInput.removeEventListener('keydown', onInputKeydown);
}

function onImgDescriptionInputFocus () {
  imgDescriptionInput.addEventListener('keydown', onInputKeydown);
}

function onImgDescriptionInputBlur () {
  imgDescriptionInput.removeEventListener('keydown', onInputKeydown);
}

function onInputKeydown (evt) {
  evt.stopPropagation();
}
