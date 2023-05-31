const express = require("express");

const router = express.Router();
const tranportController = require("../controllers/transport.Controller");
router.post("/:id", tranportController.addTransport);
router.put("/:id", tranportController.updateTransport);
router.delete("/:id", tranportController.deleteTransport);
// router.get("/:id", tranportController.getTransportbyId);
router.get("/", tranportController.getTransport);
module.exports = router;
