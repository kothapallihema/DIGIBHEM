
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

// Middleware to parse POST data
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'hotelBooking'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL database.');
});

// Route to handle form submission
app.post('/submit', (req, res) => {
    const postData = {
        name: req.body.name,
        checkin_date: req.body.checkin_date,
        total_days: req.body.total_days,
        total_persons: req.body.persons
        //... other form fields
    };

    const sql = 'INSERT INTO Guests SET ?';
    db.query(sql, postData, (err, result) => {
        if (err) {
            console.error(err);
            res.json({ message: 'Error saving data!' });
            return;
        }
        res.json({ message: 'Booking details added to the database.' });
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
