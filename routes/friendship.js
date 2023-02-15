const express = require('express');
const router = express.Router({ mergeParams: true });
const friendshipController = require('../controllers/friendship');

//api
router.post('/', friendshipController.makeFriend);

module.exports = router;