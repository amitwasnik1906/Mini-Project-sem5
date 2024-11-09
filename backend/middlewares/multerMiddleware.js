// upload.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure the 'uploads' directory exists
const __dirname = path.resolve();  // To get the current directory in ES modules
const uploadDir = path.join(__dirname, 'backend/uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });  // Create the folder if it doesn't exist
}

// Define Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);  // Destination folder for file uploads
  },
  filename: function (req, file, cb) {
    // Create a unique filename using the original name and current timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Multer upload instance
export const upload = multer({
  storage: storage,
});