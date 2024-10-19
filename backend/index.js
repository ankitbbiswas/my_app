const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes'); // Import your routes

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ensure mongoose.connect is called once and only once
mongoose
  .connect('mongodb://localhost:27017/auth') // Ensure only this one connection string is used
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Routes
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
