
const express = require("express");
const router = express.Router();
const admin_Controllers = require('../controllers/admin_controllers')
const createBidController = require("../controllers/create-bidController");
const  isAuthenticated  = require("../middleware/auth.middleware");



router.post('/register',admin_Controllers.Addadmin );
router.post('/login',admin_Controllers.Login );
router.get('/users', admin_Controllers.allUsers);
router.get('/buyer',  admin_Controllers.getBuyer);
router.get('/supplier',  admin_Controllers.getSupplie);
router.get('/transpoter',  admin_Controllers.getTransporter);
// router.get('')


// router.post("/", isAuthenticated2, createBidController.createBid);
// router.put("/:id", isAuthenticated2, createBidController.updateBid);
// router.delete("/:id", isAuthenticated2, createBidController.deleteBid);
// router.get("/", isAuthenticated2, createBidController.getBidDetails);
// router.get("/:id", isAuthenticated2, createBidController.getBidDetailsById);
// router.put(
//   "/verifyByAdmin/:id",
//   isAuthenticated2,
//   createBidController.verifiedBidByAdmin
// );
// router.get("/search", isAuthenticated2, createBidController.allUsers);
module.exports = router;
