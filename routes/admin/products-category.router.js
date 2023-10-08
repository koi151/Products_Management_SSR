const express = require('express');
const multer = require('multer')
const router = express.Router();

const upload = multer()

const controller = require('../../controllers/admin/products-category.controller');
const uploadCloud  = require("../../middlewares/admin/uploadCloud.middleware");

router.get('/', controller.index);
router.get('/create', controller.create);
router.get('/edit/:id', controller.edit);

router.post(
  '/create',
  upload.single("thumbnail"),
  uploadCloud.upload,
  controller.createPost
);

router.patch(
  '/edit/:id',
  upload.single("thumbnail"),
  uploadCloud.upload,
  controller.editPatch
);

module.exports = router;