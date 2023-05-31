
const express = require("express");
const router = express.Router();
const createBidController = require("../controllers/create-bidController");
const { isAuthenticated2 } = require("../controllers/auth.controller");

router.post("/",  createBidController.createBid);
router.put("/:id",  createBidController.updateBid);
router.delete("/:id",createBidController.deleteBid);
router.get("/",  createBidController.getBidDetails);
router.get('/all',createBidController.GetAllBids );
router.get("/:id", createBidController.getBidDetailsById);
router.put('/rebid/:id', createBidController.RecreateBid)
router.put(
  "/verifyByAdmin/:id",
  createBidController.verifiedBidByAdmin
);
router.get("/search", isAuthenticated2, createBidController.allUsers);
module.exports = router;

//router.get('/heightBid/:user/:id' , createBidController.filterHightestBidlist);
router.post('/accept/:id/:user', createBidController.AcceptBid);
router.post('/cancel/:id/:user', createBidController.RejectBid);
router.get('/payment/summary/', createBidController.getPaymentByLotId)
router.post('/bidstatus/:id', createBidController.changeStatusByTimer)
router.get('/bidId/:id', createBidController.getBidByBidId);
router.delete('/delete/all', createBidController.DeleteAll);
router.get('/waitlist/:id', createBidController.RemaingData);
router.post('/payment', createBidController.createpaymentSummary);
router.post('/waitlist/bid/:id', createBidController.getBidByBidId);
router.post('/payment/status/:id', createBidController.PaymntStatus);
router.get('/payment/bidId/:id', createBidController.paymentByBidId);
router.get('/payment/placeBid/:id', createBidController.paymentByPlacBidd)
router.post('/lotId', createBidController.getBidByLotId)
// router.get("/", (req, res) => {
//   var apiCall = unirest(
//     "GET",

//     "https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/"
//   );

//   apiCall.headers({
//     "x-rapidapi-host": "ip-geolocation-ipwhois-io.p.rapidapi.com",

//     "x-rapidapi-key": "b5cad13176msh7e4a0e88c861eb2p139da7jsn73f91d27c8d1",
//   });

//   apiCall.end(function (result) {
//     if (res.error) throw new Error(result.error);

//     console.log(result.body);

//     res.send(result.body);
//   });
// });
