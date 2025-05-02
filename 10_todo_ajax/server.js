const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

// Load tasks
app.get('/tasks', (req, res) => {
    fs.readFile('tasks.json', (err, data) => {
        if (err) return res.status(500).send('Error reading tasks');
        res.json(JSON.parse(data));
    });
});

// Save tasks (overwrite file)
app.post('/tasks', (req, res) => {
    fs.writeFile('tasks.json', JSON.stringify(req.body), (err) => {
        if (err) return res.status(500).send('Error saving tasks');
        res.sendStatus(200);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
