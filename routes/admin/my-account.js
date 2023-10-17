const express = require('express');
const multer = require('multer');
const router = express.Router();

const upload = multer();

const controller = require('../../controllers/admin/my-account.controller');
const validate = require('../../validates/admin/my-account.validate');
const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware');

router.get("/", controller.index);
router.get("/edit", controller.edit);

router.patch(
  '/edit',
  upload.single("avatar"),
  uploadCloud.upload,
  validate.updatePatch, 
  controller.editPatch
);

module.exports = router;