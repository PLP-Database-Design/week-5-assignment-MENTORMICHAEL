const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

// Configure the database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Test the connection
db.connect((err) => {
    if (err) {
        return console.error("Error connecting to the database: " + err.message);
    }
    console.log("Connected to the MySQL database successfully.");
});



// question 1. Retrieve all patients
app.get('/patients', (req, res) => {
    const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients";
    db.query(getPatients, (err, data) => {
        if (err) {
            return res.status(400).send("Failed to get patients", err);
        }
        res.status(200).send(data);
    });
});

// question 2. Retrieve all providers
app.get('/providers', (req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_speciality FROM providers";
    db.query(getProviders, (err, data) => {
        if (err) {
            return res.status(400).send("Failed to get providers", err);
        }
        res.status(200).send(data);
    });
});

// question 3. Filter patients by First Name
app.get('/patients/first-name', (req, res) => {
    const firstName = req.query.first_name;
    const filterPatients = "SELECT * FROM patients WHERE first_name = ?";
    db.query(filterPatients, [firstName], (err, data) => {
        if (err) {
            return res.status(400).send("Error filtering patients", err);
        }
        res.status(200).send(data);
    });
});

// question 4. Retrieve all providers by their specialty
app.get('/providers/specialty', (req, res) => {
    const specialty = req.query.specialty;
    const filterProviders = "SELECT * FROM providers WHERE provider_speciality = ?";
    db.query(filterProviders, [specialty], (err, data) => {
        if (err) {
            return res.status(400).send("Error filtering providers", err);
        }
        res.status(200).send(data);
    });
});

// Listen to the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});