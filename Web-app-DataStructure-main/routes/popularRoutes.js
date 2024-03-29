const express = require('express');
const userController = require('../controllers/popularController');

const router = express.Router();

router.get('/create', userController.popular_create_get);
router.get('/', userController.popular_index);
router.post('/', userController.popular_create_post);
router.delete('/:id', userController.popular_delete);

module.exports = router;