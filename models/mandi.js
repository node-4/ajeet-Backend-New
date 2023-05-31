const mongoose = require('mongoose');


const mandiSchema = mongoose.Schema({
    product: {
        type: String
    },
    location: {
        type: String
    }, 
    Date: {
        type: String
    }, 
    arrival : {
        type: String
    },
    minPrice: {
        type: Number,
        default: 0
    }, 
    maxPrice: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('mandi', mandiSchema)
