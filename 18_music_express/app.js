const express = require('express');
const mongoose = require('mongoose');
const songRoutes = require('./routes/songRoute');

const app = express();
app.set('view engine', 'ejs');

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/music', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.use('/', songRoutes);

// Start server
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
