const mongoose = require('mongoose');

const News = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        require: false
    }, 
    name: {
        type: String,
        require: false
    }, 
    message: {
        type: String, 
        require: false
    }, 
    photo: {
        type: String, 
        require: false
    }, 
    video: {
        type: String,
        require: false
    }, 
    voice: {
        type: String,
        require: false
    }, 
    link: {
        type: String,
        require: false
    }
},{new : true})

const news = mongoose.model('krishiShlah', News);

module.exports = news