// Import required modules
const express = require('express');
const fs = require('fs');
const path = require('path');

// Create an Express application
const app = express();

// Define the port number
const PORT = 3000;

// Tell Express to serve static files from the "public" folder
app.use(express.static('public'));

// API route to get the list of users
app.get('/api/users', (req, res) => {
  // Read the users.json file
  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
      // If there's an error reading the file, send a 500 error
      return res.status(500).json({ message: 'Unable to read user data' });
    }

    // Parse the JSON data
    const users = JSON.parse(data);

    // Send the users as a JSON response
    res.json(users);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
