import { BUTTON_CLOSE_MODULE_WINDOW } from './constants';

const URL = 'https://32.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу.',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз.',
};

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

const load = (route, error, method = Method.GET, body = null) =>
  fetch(`${URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => error()
    );

const showGetDataErrorMessage = () => {
  const errorElement = document.querySelector('.data-error');
  errorElement.classList.remove('hidden');
  setTimeout(() => errorElement.classList.add('hidden'), 5000);

  throw new Error(ErrorText.GET_DATA);
};

const showSendDataErrorMessage = () => {
  sendDataErrorElement.classList.remove('hidden');
  sendDataErrorElement.addEventListener('click', onSendDataErrorElementClick);
  sendDataErrorCloseButton.addEventListener('click', onSendDataErrorCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);

  throw new Error(ErrorText.SEND_DATA);
};

const showSendDataSuccessMessage = () => {
  sendDataSuccessElement.classList.remove('hidden');
  sendDataSuccessElement.addEventListener('click', onSendDataSuccessElementClick);
  sendDataSuccessCloseButton.addEventListener('click', onSendDataSuccessCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const getData = () => load(Route.GET_DATA, showGetDataErrorMessage);

const sendData = (body) => load(Route.SEND_DATA, showSendDataErrorMessage, Method.POST, body);

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

function onDocumentKeydown (evt) {
  if (evt.key === BUTTON_CLOSE_MODULE_WINDOW) {
    hideSendDataSuccessMessage();
    hideSendDataErrorMessage();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
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

export { getData, sendData, showSendDataSuccessMessage};
