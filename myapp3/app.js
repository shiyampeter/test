require('dotenv').config();
const Joi=require('joi');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

const routes = require('./routes/examtyperoutes');
const routes1 = require('./routes/sturoutes');
const routes2 = require('./routes/subroutes');
const routes3 = require('./routes/examroutes');

const app = express();
app.use(express.json());
app.use('/api/examtype', routes);
app.use('/api/student', routes1);
app.use('/api/subject', routes2);
app.use('/api/exam', routes3);



database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})



app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})