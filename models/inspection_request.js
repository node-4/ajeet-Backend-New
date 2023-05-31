const mongoose = require('mongoose')

const inspectionRequest = mongoose.Schema({
   comapny: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "company", 
        require: true, 
    }, 
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' ,
        require: true
    }, 
    status: {
        type: String,
        default: "accept"
    }
})

module.exports = mongoose.model('inspectionRequest', inspectionRequest);