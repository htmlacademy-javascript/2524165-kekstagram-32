import { getData } from './api.js';
import { showGetDataErrorMessage } from './system-modal-messages.js';
import { drawMiniatures } from './draw-miniatures.js';
import { getPhotosForFullImages } from './draw-full-images.js';
import './upload-image-form.js';
import { showImageFilters, getPhotosForFilter } from './image-filters.js';

getData()
  .then((photos) => {
    drawMiniatures(photos);
    showImageFilters();
    getPhotosForFilter(photos);
    getPhotosForFullImages(photos);
  })
  .catch(() => showGetDataErrorMessage());

