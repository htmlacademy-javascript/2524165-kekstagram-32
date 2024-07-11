const NUMBER_OF_PHOTOS = 25;
const AVATAR_URL_NUMBER_MIN = 1;
const AVATAR_URL_NUMBER_MAX = 6;
const LIKES_NUMBER_MIN = 15;
const LIKES_NUMBER_MAX = 200;
const COMMENTS_NUMBER_MIN = 0;
const COMMENTS_NUMBER_MAX = 30;
const MESSAGES_NUMBER_MIN = 1;
const MESSAGES_NUMBER_MAX = 2;

const DESCRIPTIONS = [
  'Съездил на море.',
  'Сходил в парк.',
  'Пришёл домой.',
  'Получил диплом!',
  'Моя новая машина!',
  'Встретились с друзьями.',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Артём',
  'Андрей',
  'Анна',
  'Анастасия',
  'Антон',
  'Александр',
  'Борис',
  'Валентин',
  'Владислав',
  'Валерия',
  'Виктория',
  'Вероника',
  'Даниил',
  'Геннадий',
  'Григорий',
  'Дмитрий',
  'Дарья',
  'Егор',
  'Елизавета',
  'Екатерина',
  'Игорь',
  'Ирина',
  'Марина',
  'Марат',
  'Оксана',
  'Олег',
  'Ольга',
  'Светлана',
  'Сергей',
  'Яна'
];

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

function generateCommentMessage() {
  return Array.from({length: getRandomPositiveInteger(MESSAGES_NUMBER_MIN, MESSAGES_NUMBER_MAX)}, () => getRandomArrayElement(MESSAGES)).join(' ');
}

const generateNewCommentId = generateNewID();
const generateNewImageID = generateNewID();
const generateNewImageUrlNumber = generateNewID();

const generateComment = () => ({
  id: generateNewCommentId(),
  avatar: `img/avatar-${getRandomPositiveInteger(AVATAR_URL_NUMBER_MIN, AVATAR_URL_NUMBER_MAX)}.svg`,
  message: generateCommentMessage(),
  name: getRandomArrayElement(NAMES),
});

const generatePhoto = () => ({
  id: generateNewImageID(),
  url: `photos/${generateNewImageUrlNumber()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(LIKES_NUMBER_MIN, LIKES_NUMBER_MAX),
  comments: Array.from({length: getRandomPositiveInteger(COMMENTS_NUMBER_MIN, COMMENTS_NUMBER_MAX)}, generateComment),
});

//Поменял на функцию, так как в коде не допускаются неиспользуемые переменные
function generateRandomPhotos() {
  return Array.from({length: NUMBER_OF_PHOTOS}, generatePhoto);
}

generateRandomPhotos();

