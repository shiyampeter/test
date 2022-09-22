const mongoose = require('mongoose');
const Joi= require('joi');
const mongoosePaginate = require('mongoose-paginate-v2');

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

dataSchema.plugin(mongoosePaginate);

    module.exports = mongoose.model('student', dataSchema);
    