// function getRandomPositiveInteger(min, max) {
//   const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
//   const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
//   return Math.floor(Math.random() * (upper - lower + 1) + lower);
// }

// function getRandomArrayElement(array) {
//   return array[getRandomPositiveInteger(0, array.length - 1)];
// }

// function generateNewID() {
//   let id = 0;

//   return () => {
//     id++;
//     return id;
//   };
// }

const createLoadDataErrorElement = () => createSystemMessageElement('#data-error', 'data-error');
const createSendDataErrorElement = () => createSystemMessageElement('#error', 'error');
const createSendDataSuccessElement = () => createSystemMessageElement('#success', 'success');

createLoadDataErrorElement();
createSendDataErrorElement();
createSendDataSuccessElement();

const sendDataErrorElement = document.querySelector('.error');
const sendDataSuccessElement = document.querySelector('.success');
const sendDataErrorCloseButton = sendDataErrorElement.querySelector('.error__button');
const sendDataSuccessCloseButton = sendDataSuccessElement.querySelector('.success__button');

function createSystemMessageElement (templateID, templateContentClass) {
  const template = document.querySelector(templateID).content.querySelector(`.${templateContentClass}`);
  const errorFragment = document.createDocumentFragment();
  const errorElement = template.cloneNode(true);
  errorElement.classList.add('hidden');
  errorFragment.append(errorElement);
  document.body.append(errorFragment);
}

const showGetDataErrorMessage = () => {
  const errorElement = document.querySelector('.data-error');
  errorElement.classList.remove('hidden');
  setTimeout(() => errorElement.classList.add('hidden'), 5000);
};

const showSendDataErrorMessage = () => {
  sendDataErrorElement.classList.remove('hidden');
  sendDataErrorElement.addEventListener('click', onSendDataErrorElementClick);
  sendDataErrorCloseButton.addEventListener('click', onSendDataErrorCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const showSendDataSuccessMessage = () => {
  sendDataSuccessElement.classList.remove('hidden');
  sendDataSuccessElement.addEventListener('click', onSendDataSuccessElementClick);
  sendDataSuccessCloseButton.addEventListener('click', onSendDataSuccessCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

function onSendDataErrorCloseButtonClick () {
  hideSendDataErrorMessage();
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onSendDataSuccessCloseButtonClick () {
  hideSendDataSuccessMessage();
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onSendDataErrorElementClick (evt) {
  if (evt.target.matches('[class="error"]')) {
    hideSendDataErrorMessage();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
}

function onSendDataSuccessElementClick (evt) {
  if (evt.target.matches('[class="success"]')) {
    hideSendDataSuccessMessage();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
}

function onDocumentKeydown () {
  hideSendDataSuccessMessage();
  hideSendDataErrorMessage();
  document.removeEventListener('keydown', onDocumentKeydown);
}

function hideSendDataSuccessMessage () {
  sendDataSuccessElement.classList.add('hidden');
  sendDataSuccessElement.removeEventListener('click', onSendDataSuccessElementClick);
  sendDataSuccessCloseButton.removeEventListener('click', onSendDataSuccessCloseButtonClick);
}

function hideSendDataErrorMessage () {
  sendDataErrorElement.classList.add('hidden');
  sendDataErrorElement.removeEventListener('click', onSendDataErrorElementClick);
  sendDataErrorCloseButton.removeEventListener('click', onSendDataErrorCloseButtonClick);
}

export {showGetDataErrorMessage, showSendDataErrorMessage, showSendDataSuccessMessage};
