import { generateRandomPhotos } from './data.js';
import { drawMiniatures } from './draw-miniatures.js';
import './draw-full-images.js';
import './upload-image-form.js';

const generatedPhotos = generateRandomPhotos();

drawMiniatures(generatedPhotos);

export { generatedPhotos };
