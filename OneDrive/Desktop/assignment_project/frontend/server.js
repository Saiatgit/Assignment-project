const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <h2>To-Do Form</h2>
        <form action="/submit" method="POST">
            Item Name:<br>
            <input type="text" name="itemName"><br><br>

            Description:<br>
            <input type="text" name="itemDescription"><br><br>

            <button type="submit">Add</button>
        </form>
    `);
});

const http = require('http');

app.post('/submit', (req, res) => {
    const { itemName, itemDescription } = req.body;

    const postData = `itemName=${itemName}&itemDescription=${itemDescription}`;

    const options = {
        hostname: 'backend',
        port: 5000,
        path: '/submittodoitem',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    };

    const request = http.request(options, (response) => {
        let data = '';

        response.on('data', chunk => data += chunk);
        response.on('end', () => res.send(data));
    });

    request.on('error', () => {
        res.send("Error connecting to backend");
    });

    request.write(postData);
    request.end();
});

app.listen(3000, () => {
    console.log("Frontend running on http://localhost:3000");
});