
const express = require('express');
const cors = require("cors");
const connection = require("./config/connection"); // Ensure this connects to your MongoDB
const propertyRoutes = require("./routes/property.routes");
const cleanerRoutes = require("./routes/cleaner.routes");
const eventRoutes = require("./routes/event.routes");
const multer = require('multer');
const path = require('path');


const app = express();
const port = 8000;

// middleware 
app.use(express.json());
app.use(cors());

// routes
app.use("/properties", propertyRoutes);
app.use("/cleaners", cleanerRoutes);
app.use("events", eventRoutes);

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`The server start listening on port ${port}`);
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});
const upload = multer({ storage });


// Endpoint for uploading images
app.post('/upload', upload.single('image'), (req, res) => {
  const imagePath = `/uploads/${req.file.filename}`;
  res.json({ imagePath });
});

// Endpoint for fetching uploaded images (optional, for persistent list)
let uploadedImages = [];
app.get('/images', (req, res) => {
  res.json(uploadedImages);
});
