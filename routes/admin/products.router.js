const express = require('express');
const multer = require('multer')
const router = express.Router();

const storageMulterHelper =  require("../../helpers/storageMulter");
const storage = storageMulterHelper();
const upload = multer({ storage: storage })

const controller = require('../../controllers/admin/products.controller');
const validate = require('../../validates/admin/products.validate');

router.get('/', controller.index);

router.patch('/change-status/:status/:id', controller.changeStatus);
router.patch('/change-multi', controller.changeMulti);

router.get('/create', upload.single('thumbnail'), controller.create); // For loading create product page
router.post(
  '/create', 
  upload.single("thumbnail"),
  validate.createPost,
  controller.createPost
); 

router.get('/edit/:id', controller.edit);
router.patch(
  '/edit/:id', 
  upload.single("thumbnail"),
  validate.createPost,
  controller.editPatch
);

router.delete('/delete/:id', controller.deleteItem);

router.get('/detail/:id', controller.detail);

module.exports = router;