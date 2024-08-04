import { drawMiniatures } from './draw-miniatures.js';
import { getData } from './api.js';
import { getPhotos } from './draw-full-images.js';
import './upload-image-form.js';

getData().then((photos) => {
  drawMiniatures(photos);
  getPhotos(photos);
});

