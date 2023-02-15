const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/user');

//apis
router.post('/sign-in', usercontroller.signIn);
router.post('/sign-up', usercontroller.signUp);
router.get('/', usercontroller.currentUserDetails);

module.exports = router;