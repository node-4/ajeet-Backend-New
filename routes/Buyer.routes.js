const express = require("express");
const { isAuthenticated2 } = require("../controllers/auth.controller");

const router = express.Router();
const placebid = require("../controllers/buyer.controller");
router.get("/", placebid.allUsers);
router.post("/bid/:id", placebid.makeBid);
router.get("/getbid", placebid.getBuyerBid);
router.post("/search", placebid.searchBid);
router.put("/accepted/:id", placebid.buyerAccepted);
router.put("/decline/:id", placebid.buyerDecline);
router.put("/modify/:id" ,placebid.modifyBid);
router.put('/update/:id', placebid.UpdateBidDetails);
router.get('/acceptbid/:id', placebid.getAcccepted)
router.get('/getbuyer/:id', placebid.getByUserId);
router.put('/update/:id', placebid.UpdateBidDetails);
router.get('/payment', placebid.getAllPayment);
router.get('/payment/buyer/:id', placebid.getAllPaymentBuyerId);
router.get('/payment/supplier/:id', placebid.getAllPaymentSupplierId);
module.exports = router;
