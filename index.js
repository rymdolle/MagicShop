const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();
const path = require('path');

const app = express();
const listenPort = process.env.PORT || 3000;

const userRoutes = require('./routes/user');
const itemRoutes = require('./routes/item');
const orderRoutes = require('./routes/order');

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'your-secret-pw',
    database: process.env.DB_NAME || 'magic_shop',
    decimalNumbers: true,
});

db.connect(err => {
    if (err) {
        return console.error('Database connection error:', err);
    }

    console.log('Connected to database');
});

app.use(express.json());

// Middleware to add db connection to requests
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Setup routes
app.use(express.static('html'));
app.use('/api', userRoutes);
app.use('/api', itemRoutes);
app.use('/api', orderRoutes);

app.listen(listenPort, () => {
    console.log(`Started express on http://localhost:${listenPort}`);
});
