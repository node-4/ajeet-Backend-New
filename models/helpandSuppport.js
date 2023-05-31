const mongoose = require('mongoose');

const helpandSupport = mongoose.Schema({
    message: {
        type: String, 
        require: true
    }
})


module.exports = mongoose.model('help', helpandSupport);