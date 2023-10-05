const express = require('express');
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
const router = express.Router();

// const storageMulterHelper = require("../../helpers/storageMulter");
// const storage = storageMulterHelper();
const upload = multer()

cloudinary.config({ 
  cloud_name: 'dd3xua0wu', 
  api_key: '175896217137661', 
  api_secret: 'USAxMd0QQ8YEzEqLoCF3A4MIhX0' 
});

const controller = require('../../controllers/admin/products.controller');
const validate = require('../../validates/admin/products.validate');

router.get('/', controller.index);

router.patch('/change-status/:status/:id', controller.changeStatus);
router.patch('/change-multi', controller.changeMulti);

router.get('/create', controller.create); 
router.post(
  '/create',
  upload.single("thumbnail"),
  function (req, res, next) {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function upload(req) {
      let result = await streamUpload(req);
      req.body[req.file.fieldname] = result.url;
      next();
    }
    upload(req);
  },
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