const mongoose  = require("mongoose");


const paymentSchema  = mongoose.Schema({
    buyerId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    supplierId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    transporterId : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    amount:{
        type: Number,
        default: 0
    },
    mode: {
        type: String
    },
    reciptId : {
        type: String
    },
})


module.exports = mongoose.model('payments', paymentSchema)