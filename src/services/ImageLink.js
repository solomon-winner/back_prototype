import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ImageLink = (Image) => {
    // Define the directory where images will be stored
    const ImageDir = path.join(__dirname, '..', '..', 'public', 'Image');
    
    // Create the directory if it doesn't exist
    if (!fs.existsSync(ImageDir)) {
        fs.mkdirSync(ImageDir, { recursive: true });
    }

    // Return both the full filesystem path and the relative path
    return {
        fullPath: path.join(ImageDir, Image), // Full path for saving the file
        relativePath: path.join('Image', Image).replace(/\\/g, "/") // Relative path for storing in the database
    };
};