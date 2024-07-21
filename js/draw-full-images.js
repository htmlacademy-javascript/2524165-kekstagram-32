/* Окно должно открываться при клике на миниатюру.
Данные для окна (изображение, комментарии, лайки и так далее)
берите из того же объекта, который использовался для отрисовки
соответствующей миниатюры.

После открытия окна добавьте тегу <body> класс modal-open,
чтобы контейнер с фотографиями позади не прокручивался при скролле.
При закрытии окна не забудьте удалить этот класс.

Напишите код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия.

Подключите модуль в проект.
*/

import { generatedPhotos } from './main';

const picturesContainer = document.querySelector('.pictures');
const bigPictureElement = document.querySelector('.big-picture');

//Удаляет два комментария в исходной разметке
deleteBigPictureComments();

picturesContainer.addEventListener('click', (evt) => {
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

});

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
  const commentsChildren = comments.children;
  for (let i = commentsChildren.length - 1; i >= 0; i--) {
    comments.removeChild(commentsChildren[i]);
  }

}

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

bigPictureElement.querySelector('.cancel').addEventListener('click', closeBigPicture);

