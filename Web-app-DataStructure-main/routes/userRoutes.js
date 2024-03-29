const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/create', userController.user_create_get);
router.get('/', userController.user_index);
router.post('/', userController.user_create_post);
router.get('/:id', userController.user_details);
router.get('/update/:id', userController.user_update_get);
router.post('/update/:id', userController.user_update_post);
router.delete('/:id', userController.user_delete);

module.exports = router;