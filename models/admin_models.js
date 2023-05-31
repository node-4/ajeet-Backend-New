const mongoose = require('mongoose');


const AdminSchema = mongoose.Schema({
    email: {
        type: String
    }, 
    password: {
        type: String
    }
})

module.exports = mongoose.model('admin', AdminSchema);


