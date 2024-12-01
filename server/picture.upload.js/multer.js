const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save the uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename the file to include timestamp
  }
});

// Set up multer
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

app.use('/uploads', express.static('uploads')); // Serve the files statically

// Endpoint to handle image upload
app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    res.status(200).json({ imagePath: `/uploads/${req.file.filename}` });
  } else {
    res.status(400).json({ message: 'No file uploaded' });
  }
});

// Start the server
app.listen(8000, () => console.log('Server running on port 8000'));
