import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const GeoJsonLink = (Image) => {
    const ImageDir = path.join(__dirname, '..', '..', 'public', 'Image');
    if (!fs.existsSync(ImageDir)) {
        fs.mkdirSync(ImageDir, { recursive: true });
    }

    return path.join(ImageDir, Image);
};