import { generateRandomPhotos } from './data.js';
import { drawMiniatures } from './draw-miniatures.js';
import './draw-full-images.js';

const generatedPhotos = generateRandomPhotos();

drawMiniatures(generatedPhotos);

export { generatedPhotos };
