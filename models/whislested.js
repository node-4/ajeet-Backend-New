const mongoose = require('mongoose')


const whislested = mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
    },
    bid:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'createbid'
    },
    top: []
})

const waitlist = mongoose.model('waitlist', whislested);
module.exports  = waitlist;