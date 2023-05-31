const mongoose = require('mongoose');

const  paymentSummary  = mongoose.Schema({
    buyerId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    supplierId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    BidId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "createbid"
    },
    placeBidId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "buyerSchema"
    },
    amount:{
        type: Number,
        default: 0
    },
    pending: {
        type: Number,
        default: 0,
    },
    mode: {
        type: String
    },
    status: {
        type: String
    }
})

const payment = mongoose.model('paymentSummary', paymentSummary);
module.exports = payment