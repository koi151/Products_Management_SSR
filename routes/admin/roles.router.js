const express = require('express');
const router = express.Router();

const controller = require('../../controllers/admin/roles.controller');

router.get('/', controller.index);
router.get('/create', controller.create);
router.get('/edit/:id', controller.edit);
router.get('/permissions', controller.permissions);

router.post('/create', controller.createPost);

router.patch('/edit/:id', controller.editPatch);
router.patch('/permissions', controller.permissionsPatch);

module.exports  = router;