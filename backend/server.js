const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();

app.listen(process.env.PORT, () => {
  console.log("server running")
})

// Middleware
// app.use(express.json());

// Routes
// app.use('/api/auth', authRoutes);

// // Connect to MongoDB and start server
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//     app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
//   })
//   .catch(err => console.log(err));
