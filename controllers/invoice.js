const crypto = require('crypto');
const Invoice = require('../models/invoice_model');
const User = require('../models/auth.model');
const Crop = require('../models/crop')



function generateInvoiceNumber() {
    const length = 8;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
exports.CreateInvoices = async (req, res) => {
    try {
        if (!req.body.buyerId && !req.body.supplierId) {
            return res.status(200).json({ message: "buyerId and SupplirerId required and if payment" })
        }
        var buyerData = await User.findById({ _id: req.body.buyerId });
        var supplierData = await User.findById({ _id: req.body.supplierId });
        if (buyerData.length == 0 && !supplierData.length == 0) {
            return res.status(400).json({ message: "User not Found " })
        }
        const data = {
            invoiceNumber: generateInvoiceNumber(),
            crop: req.body.crop,
            buyerId: req.body.buyerId,
            supplierId: req.body.supplierId,
            sellerBid: req.body.sellerBid,
            buyerBid: req.body.buyerBid,
            transporterId: req.body.transporterId,
            mode: req.body.mode,
            amount: parseInt(req.body.amount),
            status: req.body.status
        }
        const result = await Invoice.create(data);
        res.status(200).json({
            message: "ok",
            result: result
        })


    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}
exports.getAllInvoice = async (req, res) => {
    try {
        const result = await Invoice.find().populate("buyerId supplierId sellerBid buyerBid");
        res.status(200).json({
            message: "ok",
            result: result
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "not ok",
            error: err.message
        })
    }
}


exports.DeleteInvoice = async (req, res) => {
    try {
        const result = await Invoice.findById({ _id: req.params.id });
        res.status(200).json({
            message: "ok",
            result: null
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "not ok",
            error: err.message
        })
    }
}

exports.getBuyerID = async (req, res) => {
    try {
        const result = await Invoice.find({ buyerId: req.params.buyerId });
        res.status(200).json({
            message: "ok",
            result: result
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "not ok",
            error: err.message
        })
    }
}

exports.getSupplierID = async (req, res) => {
    try {
        const result = await Invoice.find({ supplierId: req.params.supplierId });
        res.status(200).json({
            message: "ok",
            result: result
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "not ok",
            error: err.message
        })
    }
}

exports.getByID = async (req, res) => {
    try {
        const result = await Invoice.findById({ _id: req.params.id });
        res.status(200).json({
            message: "ok",
            result: result
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "not ok",
            error: err.message
        })
    }
}

exports.getInvoicebysellerBid = async (req, res) => {
    try {
        const result = await Invoice.find({ sellerBid: req.params.sellerBid }).populate('buyerId supplierId transporterId sellerBid buyerBid');
        res.status(200).json({
            message: "ok",
            result: result
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "not ok",
            error: err.message
        })
    }
}

exports.getInvoiceBybuyerBidID = async (req, res) => {
    try {
        const result = await Invoice.find({ buyerBid: req.params.buyerBid }).populate('buyerId supplierId transporterId sellerBid buyerBid');
        res.status(200).json({
            message: "ok",
            result: result
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "not ok",
            error: err.message
        })
    }
}
