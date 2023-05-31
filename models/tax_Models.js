const mongoose = require('mongoose');

const texSchema = mongoose.Schema({
    tax: {
        type: Number, 
        default: 0
    }, 
    others_charges : {
        type: Number, 
        default: 0
    }, 
    others: {
        type: Number, 
        default: 0
    }
})

module.exports = mongoose.model('tax_model', texSchema)