require('dotenv').config();
const Joi=require('joi');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

const User = require('./model/user'),
bodyParser = require('body-parser'),
jsonwebtoken = require("jsonwebtoken");


mongoose.connect(mongoString);
const database = mongoose.connection;

const routes = require('./routes/examtyperoutes');
const routes1 = require('./routes/sturoutes');
const routes2 = require('./routes/subroutes');
const routes3 = require('./routes/examroutes');
const routes4 = require('./routes/userroutes');

const app = express();
app.use(express.json());
app.use('/api/examtype', routes);
app.use('/api/student', routes1);
app.use('/api/subject', routes2);
app.use('/api/exam', routes3);
app.use('/api/user', routes4);

app.use(function(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
      jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      });
    } else {
      req.user = undefined;
      next();
    }
  });

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})



app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})