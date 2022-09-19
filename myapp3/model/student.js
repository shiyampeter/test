const mongoose = require('mongoose');
const Joi= require('joi');
const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    rno: {
        required: true,
        type: Number
    },
    dept: {
        required: true,
        type: String
    }
    
})


    module.exports = mongoose.model('student', dataSchema);
    