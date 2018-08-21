const express = require('express');
const router = express.Router();
const wrap = require('express-async-wrap');

const UserCtrl = require('../controllers/UserCtrl');

// 회원가입
router.route('/users/register')
    .post(wrap(UserCtrl.register));

module.exports = router;