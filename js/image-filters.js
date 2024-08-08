import { drawMiniatures } from './draw-miniatures';
import { getRandomArrayElement, debounce } from './util';
import { FILTER_NUMBER_OF_RANDOM_IMAGES } from './constants';

const imgFilters = document.querySelector('.img-filters');
const filterDefaultButton = imgFilters.querySelector('#filter-default');
const filterRandomButton = imgFilters.querySelector('#filter-random');
const filterDiscussedButton = imgFilters.querySelector('#filter-discussed');

let loadedPhotos;
function getPhotosForFilter (photos) {
  loadedPhotos = photos;
}

filterDefaultButton.addEventListener('click', onFilterDefaultButtonClick);
filterRandomButton.addEventListener('click', onfilterRandomButtonClick);
filterDiscussedButton.addEventListener('click', onfilterDiscussedButtonClick);

function onFilterDefaultButtonClick () {
  setFilterButtonActive(filterDefaultButton);
  if (loadedPhotos) {
    filterImages('filterDefault');
  }
}

function onfilterRandomButtonClick () {
  setFilterButtonActive(filterRandomButton);
  if (loadedPhotos) {
    filterImages('filterRandom');
  }
}

function onfilterDiscussedButtonClick () {
  setFilterButtonActive(filterDiscussedButton);
  if (loadedPhotos) {
    filterImages('filterDiscussed');
  }
}

function filterImages (filterName) {
  const photosCopy = loadedPhotos.slice();
  const debouncedDrawMiniatures = debounce(drawMiniatures);

  if (filterName === 'filterDefault') {
    const photosResult = filterImagesDefault(photosCopy);
    debouncedDrawMiniatures(photosResult);
  }
  if (filterName === 'filterRandom') {
    const photosResult = filterImagesRandom(photosCopy);
    debouncedDrawMiniatures(photosResult);
  }
  if (filterName === 'filterDiscussed') {
    const photosResult = filterImagesDiscussed(photosCopy);
    debouncedDrawMiniatures(photosResult);
  }
}

function filterImagesDefault (photos) {
  return photos;
}

function filterImagesRandom (photos) {
  const randomPhotos = [];
  while (randomPhotos.length < FILTER_NUMBER_OF_RANDOM_IMAGES) {
    const image = getRandomArrayElement(photos);
    if (!randomPhotos.some((photo) => photo.id === image.id)) {
      randomPhotos.push(image);
    }
  }
  return randomPhotos;
}

function filterImagesDiscussed (photos) {
  return photos.sort(comparePhotosComments);
}

function comparePhotosComments (photoA, photoB) {
  return photoB.comments.length - photoA.comments.length;
}

function setFilterButtonActive (filterButton) {
  filterDefaultButton.classList.remove('img-filters__button--active');
  filterRandomButton.classList.remove('img-filters__button--active');
  filterDiscussedButton.classList.remove('img-filters__button--active');
  filterButton.classList.add('img-filters__button--active');
}

function showImageFilters () {
  imgFilters.classList.remove('img-filters--inactive');
}

export { showImageFilters, getPhotosForFilter };

