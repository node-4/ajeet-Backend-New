const express = require("express");
const router = express.Router();
// const { isAuthenticated2 } = require("../controllers/auth.controller");

const walletController = require("../controllers/walletController");

router.get("/:id", walletController.getWallet);
//router.post("/:id", walletController.createWallet);
router.post("/add", walletController.addMoney);
router.post("/remove", walletController.removeMoney);
router.get("/:id", walletController.getWalletById);

module.exports = router;
