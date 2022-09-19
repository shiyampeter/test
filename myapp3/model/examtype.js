const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    extypename: {
        required: true,
        type: String
    },
    exid: {
        
        required: true,
        type: Number
    }
    
})

module.exports = mongoose.model('examtype', dataSchema);