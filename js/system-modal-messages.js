const createLoadDataErrorElement = () => createSystemMessageElement('#data-error', 'data-error');
const createSendDataErrorElement = () => createSystemMessageElement('#error', 'error');
const createSendDataSuccessElement = () => createSystemMessageElement('#success', 'success');

const removeLoadDataErrorElement = () => document.querySelector('.data-error').remove();
const removeSendDataErrorElement = () => document.querySelector('.error').remove();
const removeSendDataSuccessElement = () => document.querySelector('.success').remove();

function createSystemMessageElement (templateID, templateContentClass) {
  const template = document.querySelector(templateID).content.querySelector(`.${templateContentClass}`);
  const errorFragment = document.createDocumentFragment();
  const errorElement = template.cloneNode(true);
  errorFragment.append(errorElement);
  document.body.append(errorFragment);
}

const showGetDataErrorMessage = () => {
  createLoadDataErrorElement();
  setTimeout(() => removeLoadDataErrorElement(), 5000);
};

const showSendDataErrorMessage = () => {
  createSendDataErrorElement();
  const sendDataErrorElement = document.querySelector('.error');
  const sendDataErrorCloseButton = sendDataErrorElement.querySelector('.error__button');
  sendDataErrorElement.addEventListener('click', onSendDataErrorElementClick);
  sendDataErrorCloseButton.addEventListener('click', onSendDataErrorCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const showSendDataSuccessMessage = () => {
  createSendDataSuccessElement();
  const sendDataSuccessElement = document.querySelector('.success');
  const sendDataSuccessCloseButton = sendDataSuccessElement.querySelector('.success__button');
  sendDataSuccessElement.addEventListener('click', onSendDataSuccessElementClick);
  sendDataSuccessCloseButton.addEventListener('click', onSendDataSuccessCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

function onSendDataErrorCloseButtonClick () {
  removeSendDataErrorElement();
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onSendDataSuccessCloseButtonClick () {
  removeSendDataSuccessElement();
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onSendDataErrorElementClick (evt) {
  if (evt.target.matches('[class="error"]')) {
    removeSendDataErrorElement();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
}

function onSendDataSuccessElementClick (evt) {
  if (evt.target.matches('[class="success"]')) {
    removeSendDataSuccessElement();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
}

function onDocumentKeydown () {
  const sendDataErrorElement = document.querySelector('.error');
  const sendDataSuccessElement = document.querySelector('.success');
  if (sendDataErrorElement) {
    removeSendDataErrorElement();
  }
  if (sendDataSuccessElement) {
    removeSendDataSuccessElement();
  }
  document.removeEventListener('keydown', onDocumentKeydown);
}

export {showGetDataErrorMessage, showSendDataErrorMessage, showSendDataSuccessMessage};

