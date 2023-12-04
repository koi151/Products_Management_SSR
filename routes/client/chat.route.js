const express = require("express");
const router = express.Router();

const controller = require('../../controllers/client/chat.controller')
// const authMiddleware = require('') // Add private route

router.get('/', controller.index);

module.exports = router;