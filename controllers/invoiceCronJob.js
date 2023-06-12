const cronJob = require("cron").CronJob;
let buyerBid = require("../models/buyer-bid");
let createbid = require("../models/create-bidmodel");
const Invoice = require('../models/invoice_model');
let paymentSummary = require("../models/paymentSummary");
// new cronJob('0 */2 * * *', async function () {
new cronJob("*/30 * * * * *", async function () {
        let findBuyerBid = await buyerBid.find({ status: "winner" });
        console.log(findBuyerBid);
        if (findBuyerBid.length == 0) {
                console.log("No data found");
        }
        else {
                for (let i = 0; i < findBuyerBid.length; i++) {
                        let findCreate = await createbid.findById({ _id: findBuyerBid[i].createbid });
                        let findinvoice = await Invoice.findOne({ buyerId: findBuyerBid[i].user, supplierId: findCreate.user_id, sellerBid: findBuyerBid[i].createbid, buyerBid: findBuyerBid[i]._id })
                        if (findinvoice) {
                                console.log("already");
                        } else {
                                let obj = {
                                        buyerId: findBuyerBid[i].user,
                                        supplierId: findCreate.user_id,
                                        sellerBid: findBuyerBid[i].createbid,
                                        buyerBid: findBuyerBid[i]._id,
                                        invoiceNumber: generateInvoiceNumber(),
                                        invoiceDate: new Date(Date.now())
                                }
                                const result = await Invoice.create(obj)
                        }
                }
        }
}).start();
// }).stop()
function generateInvoiceNumber() {
        const length = 8;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
}
