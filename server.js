require ('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');


// Importing Routes
const authRoute = require('./routes/auth');
const userName = require('./routes/userName');

// Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/auth', authRoute);
// app.use('/api/userName', userName);


// Starting Server
const PORT = process.env.PORT || 5000;
app.listen(5000);
console.log('Server started at port: ', PORT);

//Connecting to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then (() => console.log('Connected to Database...'))
.catch ((err) => {
    console.log('Cannot connect to Database', err.message);
});