import { generatedPhotos } from './main';

const BUTTON_CLOSE_MODULE_WINDOW = 'Escape';

const picturesContainer = document.querySelector('.pictures');
const bigPictureElement = document.querySelector('.big-picture');

picturesContainer.addEventListener('click', openBigPicture);
bigPictureElement.querySelector('.cancel').addEventListener('click', closeBigPicture);

function openBigPicture (evt) {
  if (evt.target.matches('img')) {
    const photoIndex = Array.from(picturesContainer.querySelectorAll('.picture img')).indexOf(evt.target);
    const photoData = generatedPhotos[photoIndex];

    bigPictureElement.classList.remove('hidden');
    bigPictureElement.querySelector('.big-picture__img img').src = photoData.url;

    const bigPictureSocial = bigPictureElement.querySelector('.big-picture__social');
    bigPictureSocial.querySelector('.likes-count').textContent = photoData.likes;

    bigPictureSocial.querySelector('.social__comment-shown-count').textContent = photoData.comments.length;
    bigPictureSocial.querySelector('.social__comment-total-count').textContent = photoData.comments.length;
    loadComments(photoData.comments);

    bigPictureSocial.querySelector('.social__caption').textContent = photoData.description;

    bigPictureSocial.querySelector('.social__comment-count').classList.add('hidden');
    bigPictureSocial.querySelector('.comments-loader').classList.add('hidden');

    document.body.classList.add('modal-open');

    document.addEventListener('keydown', onDocumentKeydown);
  }

}

function loadComments (comments) {
  const commentsSection = bigPictureElement.querySelector('.social__comments');
  const commentsFragment = document.createDocumentFragment();

  comments.forEach(({avatar, message, name}) => {
    const newComment = document.createElement('li');
    newComment.classList.add('social__comment');

    newComment.innerHTML = `<img
      class="social__picture"
      src="${avatar}"
      alt="${name}"
      width="35" height="35">
      <p class="social__text">${message}</p>`;

    commentsFragment.append(newComment);
  });

  commentsSection.append(commentsFragment);
}

function closeBigPicture () {
  deleteBigPictureComments();
  bigPictureElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
}

function deleteBigPictureComments () {
  const comments = bigPictureElement.querySelector('.social__comments');
  comments.replaceChildren();
}

function onDocumentKeydown (evt) {
  if (evt.key === BUTTON_CLOSE_MODULE_WINDOW) {
    evt.preventDefault();
    closeBigPicture();
  }
}
