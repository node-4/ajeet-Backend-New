const express = require("express");
const router = express.Router();
// const { isAuthenticated2 } = require("../controllers/auth.controller");

const walletController = require("../controllers/walletController");

router.get("/:id", walletController.getWallet);
//router.post("/:id", walletController.createWallet);
router.post("/add", walletController.addMoney);
router.post("/remove", walletController.removeMoney);
router.get("/:id", walletController.getWalletById);
router.get("/allTransactionUser/:userId", walletController.allTransactionUser);
router.get("/allcreditTransactionUser/:userId", walletController.allcreditTransactionUser);
router.get("/allDebitTransactionUser/:userId", walletController.allDebitTransactionUser);
module.exports = router;
