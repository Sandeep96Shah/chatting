const express = require('express');
const passport = require('passport');
const router = express.Router(({ mergeParams: true }));

const homecontroller = require('../controllers/home');

router.use('/user', require('./userSession'));

router.use('/friendship/:to',passport.authenticate('jwt', {session: false}), require('./friendship'));

router.use('/all-users',passport.authenticate('jwt', {session: false}), require('./allusers'));

router.use('/private-message/:to',passport.authenticate('jwt', {session: false}), require('./privateMessage'));

// router.use('/private/:from/:to',passport.authenticate('jwt', {session: false}), require('./privateMessage'));

router.use('/user-friends',passport.authenticate('jwt', {session: false}), require('./userFriends'));

router.use('/search-friend',passport.authenticate('jwt', {session: false}), require('./searchFriend'));

router.use('/current-user', passport.authenticate('jwt', {session: false}), require('./userSession'));

router.get('/', homecontroller.home);

module.exports = router;