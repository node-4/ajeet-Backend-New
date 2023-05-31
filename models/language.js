const mongoose = require('mongoose');

const language = mongoose.Schema({
    language: {
        type: String,
    }
})

module.exports = mongoose.model('language', language);

