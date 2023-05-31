const mongoose = require('mongoose');


const company = mongoose.Schema({
    name: {
        type: String, 
    }, 
    price: {
        type: Number , 
        default: 0
    }, 
    testtype: [], 
    supplier : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    }
}); 

module.exports = mongoose.model('company', company);

