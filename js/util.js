import { DEBOUNCE_DEFAULT_DELAY_TIME } from './constants';

function getRandomPositiveInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
}

function getRandomArrayElement(array) {
  return array[getRandomPositiveInteger(0, array.length - 1)];
}

function generateNewID() {
  let id = 0;

  return () => {
    id++;
    return id;
  };
}

function debounce (callback, timeoutDelay = DEBOUNCE_DEFAULT_DELAY_TIME) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { getRandomArrayElement, generateNewID, debounce };
