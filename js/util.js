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

export { getRandomArrayElement, generateNewID };
