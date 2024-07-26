import { generatedPhotos } from './main.js';
import { BUTTON_CLOSE_MODULE_WINDOW } from './constants.js';

const NUMBER_OF_COMMENTS = 5;

const picturesContainer = document.querySelector('.pictures');
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCommentsSection = bigPictureElement.querySelector('.social__comments');
const bigPictureButtonClose = bigPictureElement.querySelector('.cancel');
const bigPictureButtonCommentsLoader = bigPictureElement.querySelector('.comments-loader');

picturesContainer.addEventListener('click', onMiniatureClick);

function onMiniatureClick (evt) {
  if (evt.target.matches('img')) {
    const photoIndex = Array.from(picturesContainer.querySelectorAll('.picture img')).indexOf(evt.target);
    const photoData = generatedPhotos[photoIndex];
    bigPictureElement.dataset.id = photoData.id;

    bigPictureButtonClose.addEventListener('click', onCloseButtonClick);
    bigPictureButtonCommentsLoader.addEventListener('click', onCommentsLoaderButtonClick);

    bigPictureElement.classList.remove('hidden');
    bigPictureElement.querySelector('.big-picture__img img').src = photoData.url;

    const bigPictureSocial = bigPictureElement.querySelector('.big-picture__social');
    bigPictureSocial.querySelector('.likes-count').textContent = photoData.likes;

    bigPictureSocial.querySelector('.social__comment-shown-count').textContent = photoData.comments.length;
    bigPictureSocial.querySelector('.social__comment-total-count').textContent = photoData.comments.length;
    drawComments(loadComments(bigPictureElement.dataset.id));

    bigPictureSocial.querySelector('.social__caption').textContent = photoData.description;

    document.body.classList.add('modal-open');

    document.addEventListener('keydown', onDocumentKeydown);
  }
}

function loadComments (id) {
  const loadedComments = generatedPhotos[id - 1].comments;
  return loadedComments;
}

function drawComments (comments) {
  const commentsCurrentCount = bigPictureCommentsSection.querySelectorAll('.social__comment').length;
  const commentsFragment = document.createDocumentFragment();

  for (let i = commentsCurrentCount; i < commentsCurrentCount + NUMBER_OF_COMMENTS; i++) {
    if (comments[i]) {
      const {avatar, name, message} = comments[i];
      const newComment = document.createElement('li');
      newComment.classList.add('social__comment');
      newComment.innerHTML = `<img
        class="social__picture"
        src="${avatar}"
        alt="${name}"
        width="35" height="35">
        <p class="social__text">${message}</p>`;

      commentsFragment.append(newComment);
    }
  }
  bigPictureCommentsSection.append(commentsFragment);
  checkCommentsCount(comments.length);

}

function checkCommentsCount (commentsTotalCount) {
  const commentsCurrentCount = bigPictureCommentsSection.querySelectorAll('.social__comment').length;
  if (commentsCurrentCount === commentsTotalCount) {
    bigPictureButtonCommentsLoader.classList.add('hidden');
  } else {
    bigPictureButtonCommentsLoader.classList.remove('hidden');
  }
  bigPictureElement.querySelector('.social__comment-shown-count').textContent = commentsCurrentCount;
}

function deleteBigPictureComments () {
  const comments = bigPictureElement.querySelector('.social__comments');
  comments.replaceChildren();
}

function onCloseButtonClick () {
  deleteBigPictureComments();
  bigPictureElement.classList.add('hidden');
  bigPictureButtonClose.removeEventListener('click', onCloseButtonClick);
  bigPictureButtonCommentsLoader.removeEventListener('click', onCommentsLoaderButtonClick);
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onCommentsLoaderButtonClick () {
  drawComments(loadComments(bigPictureElement.dataset.id));
}

function onDocumentKeydown (evt) {
  if (evt.key === BUTTON_CLOSE_MODULE_WINDOW) {
    evt.preventDefault();
    onCloseButtonClick();
  }
}
