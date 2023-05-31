const mongoose = require('mongoose');

const locations = mongoose.Schema({
    address: {
        type: String
    }, 
    state: {
        type: String
    }, 
    distract: {
        type: String
    }, 
    code: {
        type: String
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        requird: false
    }
})

module.exports = mongoose.model('location' , locations);

