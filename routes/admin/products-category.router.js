const express = require('express');
const multer = require('multer')
const router = express.Router();

const upload = multer()

const controller = require('../../controllers/admin/products-category.controller');
const uploadCloud  = require("../../middlewares/admin/uploadCloud.middleware");
const validate = require("../../validates/admin/products-category.validate");

router.get('/', controller.index);
router.get('/create', controller.create);
router.get('/edit/:id', controller.edit);
router.get('/detail/:id', controller.detail),

router.post(
  '/create',
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);

router.patch('/change-status/:status/:id', controller.changeStatus);
router.patch(
  '/edit/:id',
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.editPatch
);

router.delete('/delete/:id', controller.deleteItem);

module.exports = router;