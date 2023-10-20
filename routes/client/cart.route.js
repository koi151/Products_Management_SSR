const express = require("express");
const router = express.Router();

const controller = require('../../controllers/client/cart.controller');

router.get("/", controller.index);

router.post("/add/:productId", controller.addPost);

router.get("/update/:productId/:quantity", controller.update);

module.exports = router;