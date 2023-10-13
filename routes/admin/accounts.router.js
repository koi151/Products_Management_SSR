const express = require("express");
const multer = require('multer')
const router = express.Router();

const upload = multer()

const controller = require('../../controllers/admin/accounts.controller');
const validate = require('../../validates/admin/accounts.validate');
const uploadCloud  = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/", controller.index);
router.get("/create", controller.create);
router.get("/edit/:id", controller.edit);

router.post(
  '/create',
  upload.single("avatar"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);

router.patch(
  '/edit/:id',
  upload.single("avatar"),
  uploadCloud.upload,
  validate.createPost,
  controller.editPatch
);

module.exports = router;