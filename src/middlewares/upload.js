import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure storage (memory storage here)
const storage = multer.memoryStorage();

// Function to check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png/; // Allowed extensions
    const mimetypes = /image\/jpeg|image\/jpg|image\/png/; // Allowed MIME types
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = mimetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Error: Only PNG, JPG, and JPEG files are allowed!'));
    }
}

// Multer configuration
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
});

export default upload;
