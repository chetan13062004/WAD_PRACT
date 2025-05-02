const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API to get employee details
app.get('/api/employees', (req, res) => {
    fs.readFile('employees.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Unable to fetch employee data' });
        }
        const employees = JSON.parse(data);
        res.json(employees);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
