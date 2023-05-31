const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true
  },
  crop: {
    type: String,
    required: true
  },
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
mode: {
  type: String,
},
  amount: {
    type: Number,
    default: 0,
    required: true
  },
 
  status: {
    type: String,
    enum: ['pending', 'successfully', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Invoice', invoiceSchema);