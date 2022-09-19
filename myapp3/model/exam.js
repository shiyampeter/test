const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    extypeid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'examtype'
    },
    subid: {
        
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject'
    },
    studid: {
        
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student'
    },
    mark: {
        
        type: Number,
        required:true
    }
    
})

module.exports = mongoose.model('exam', dataSchema);