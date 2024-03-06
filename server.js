const express = require('express');
const path = require('path');
const mysql = require('mysql');
require('dotenv').config();


const app = express();
const port = 3000;
// Serve static files from the "public" directory
app.use(express.static('public'));
// Create connection to the database
const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    ssl: {
        rejectUnauthorized:'true'
    }
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database');
});

// Route to fetch data from 'Food' table
app.get('/food', (req, res) => {
    // Fetch data from 'Food' table
    connection.query('SELECT ID, NAME, TYPES, LATITUDE, LONGITUDE, POSTCODE, SCORE FROM Food', (error, results, fields) => {
        if (error) {
            console.error('Error fetching data: ' + error.stack);
            res.status(500).send('Error fetching data from database');
            return;
        }
        // Send fetched data as JSON response
        res.json(results);
    });
});
// Route to fetch data from 'Food' table
app.get('/map', (req, res) => {
    // Fetch data from 'Food' table
    connection.query('SELECT NAME, LATITUDE, LONGITUDE, SCORE FROM Food', (error, results, fields) => {
        if (error) {
            console.error('Error fetching data: ' + error.stack);
            res.status(500).send('Error fetching data from database');
            return;
        }
        // Send fetched data as JSON response
        res.json(results);
    });
});
// Route to serve test.html file
app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'test.html'));
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
