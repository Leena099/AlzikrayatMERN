const path = require('path');
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require('dotenv').config();  // dotenv read .env file
const express = require('express'); // express builds the server
const cors = require('cors');
const mongoose = require('mongoose');  // cors and mongoose are for browser access and for the database

const app = express(); // app is yotheur server
app.use(cors()); // app.use help every request passes through, cors() talk to the server
app.use(express.json()); // ranslates the JSON the browser sends into a JS object

app.get('/', (req, res) => res.json({ message: 'Alzikrayat API is running' }));
app.use('/api/auth', require('./routes/authRoutes'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/photos', require('./routes/photoRoutes'));

app.use('/api/photos/:id/comments', require('./routes/commentRoutes'));

app.use(require('./middleware/errorHandler'));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err.message));