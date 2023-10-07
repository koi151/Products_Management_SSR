const express = require('express');
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const router = express.Router();

const upload = multer()

const controller = require('../../controllers/admin/products-category.controller');
const uploadCloud  = require("../../middlewares/admin/uploadCloud.middleware");

router.get('/', controller.index);

router.get('/create', controller.create);

router.post(
  '/create',
  upload.single("thumbnail"),
  uploadCloud.upload,
  controller.createPost
);

module.exports = router;