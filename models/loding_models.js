const mongoose = require('mongoose');


const lodingData = mongoose.Schema({
    buyerId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        require: true
    }, 
    supplier: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        require: true
    },
    transpoter: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        require: true
    },
    vechicle_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tranport'
    },
    sellerBid : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"createbid"
    },
    buyerBid : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "buyerSchema"
    },
    otpsupplier: {
        type: String
    },
    otpBuyer : {
        type: String
    },
    status: {
        type: String,
        enum: ['pendingPick', 'successfully', 'cancelled'],
        default: 'pendingPick'
      },
    crop : {
        type: String
    }, 
    quantity: {
        type: String
    }, 
    amount : {
        type: Number, 
        default: 0,
    }, 
    deliveryDate : {
        type: String
    },
    deliveryStatus: {
        type: String,
        default: "8 days"
    },
    shipmentId : {
        type: String
    }
})


module.exports = mongoose.model('lodingData', lodingData);