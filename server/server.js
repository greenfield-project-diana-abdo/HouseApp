
const express = require('express');
const cors = require("cors");
const connection = require("./config/connection"); // Ensure this connects to your MongoDB
const propertyRoutes = require("./routes/property.routes");
const cleanerRoutes = require("./routes/cleaner.routes");
const bookingRoutes = require("./routes/event.routes");


const app = express();
const port = 8000;

// middleware 
app.use(express.json());
app.use(cors());

// routes
app.use("/properties", propertyRoutes);
app.use("/cleaners", cleanerRoutes);
app.use('/bookings', bookingRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`The server start listening on port ${port}`);
});