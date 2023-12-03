const express = require("express");
const router = express.Router();

const controller = require('../../controllers/client/checkout.controller');

router.get("/", controller.index);
router.get("/success/:orderId", controller.success);

router.post("/order", controller.orderPost);

module.exports = router;