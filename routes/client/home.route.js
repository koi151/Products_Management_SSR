const express = require('express');
const router = express.Router();
require('dotenv').config()

const controller = require("../../controllers/client/home.controller");

router.get('/', controller.index);

module.exports = router;