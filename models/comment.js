const mongoose = require('mongoose');

const comment = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    }, 
    comment: {
        type: String,
    },
    rating : {
        type: Number, 
        default: 0
    },
    reply : {
        type: String,
        default: "pending"
    }

})

module.exports = mongoose.model('comment', comment)