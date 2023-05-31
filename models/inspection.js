const mongoose = require('mongoose');

const Inspection = mongoose.Schema({
    name: {
        type: String,
    },
    service : {
        type: String
    }, 
    price: {
        type: Number,
        default: 0 , 
    }, 
    lotID : {
        type: String
    }, 
    status: {
        type: String
    }, 
    otp: {
        type: Number, 
        default: 0
    }
})


module.exports = mongoose.model('inspection', Inspection)