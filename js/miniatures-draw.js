import {generateRandomPhotos} from './data';

const pictures = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');
const photosFragment = document.createDocumentFragment();

const photos = generateRandomPhotos();

photos.forEach(({url, description, likes, comments}) => {
  const photo = template.cloneNode(true);
  const photoImg = photo.querySelector('.picture__img');
  const photoInfo = photo.querySelector('.picture__info');
  photoImg.src = url;
  photoImg.alt = description;
  photoInfo.querySelector('.picture__likes').textContent = likes;
  photoInfo.querySelector('.picture__comments').textContent = comments.length;

  photosFragment.append(photo);
});

pictures.append(photosFragment);
