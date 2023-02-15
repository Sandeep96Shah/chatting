const express = require('express');
const router = express.Router({ mergeParams: true });
const userController = require('../controllers/user');

// apis
router.get('/', userController.userFriends);

module.exports = router;