const express = require('express');
const router = express.Router();

const controller = require('../../controllers/admin/roles.controller');

router.get('/', controller.index);
router.get('/create', controller.create);
router.get('/edit/:id', controller.edit);
router.get('/permissions', controller.permissions);
router.get('/detail/:id', controller.detail);

router.post('/create', controller.createPost);

router.patch('/edit/:id', controller.editPatch);
router.patch('/permissions', controller.permissionsPatch);

router.delete('/delete/:id', controller.deleteItem);

module.exports  = router;