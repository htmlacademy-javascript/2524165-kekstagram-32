import { BUTTON_CLOSE_MODULE_WINDOW } from './constants.js';

const imgUploadElement = document.querySelector('.img-upload');
const imgUploadForm = imgUploadElement.querySelector('.img-upload__form');
const imgUploadOverlay = imgUploadElement.querySelector('.img-upload__overlay');
const imgUploadOverlayCloseButton = imgUploadOverlay.querySelector('.img-upload__cancel');
const imgUploadInput = imgUploadElement.querySelector('.img-upload__input');
const imgHashTagsInput = imgUploadElement.querySelector('.text__hashtags');
const imgDescriptionInput = imgUploadElement.querySelector('.text__description');

const regExpPattern = /^#[a-zа-яё0-9]{1,19}$/i;

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
  return imgDescriptionInput.value.length <= 140;
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

imgUploadInput.addEventListener('change', onImgUploadValueChange);
imgHashTagsInput.addEventListener('focus', onImgHashTagsInputFocus);
imgHashTagsInput.addEventListener('blur', onImgHashTagsInputBlur);
imgDescriptionInput.addEventListener('focus', onImgDescriptionInputFocus);
imgDescriptionInput.addEventListener('blur', onImgDescriptionInputBlur);

function onImgUploadValueChange () {
  imgUploadOverlayCloseButton.addEventListener('click', onCloseModalWindow);
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.body.addEventListener('keydown', onDocumentKeydown);
}

function onCloseModalWindow () {
  imgUploadInput.value = '';
  imgUploadOverlay.classList.add('hidden');
  imgUploadOverlayCloseButton.removeEventListener('click', onCloseModalWindow);
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onDocumentKeydown (evt) {
  if (evt.key === BUTTON_CLOSE_MODULE_WINDOW) {
    evt.preventDefault();
    onCloseModalWindow();
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
