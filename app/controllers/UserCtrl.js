'use strict';

const userSchema = require('../models/UserSchema');

exports.register = async(req, res, next) => {
    // TODO: 패스워드 암호화
    let userData = {
        uid: req.body.uid,
        name: req.body.name,
        password: req.body.password
    };

    let userDoc = await userSchema.register(userData);
    console.log(userDoc);
    res.json({
        "success": true,
        "code": 200,
        "message": "회원가입이 완료되었습니다.",
        "time": new Date()
    })
};

exports.login = async(req, res, next) => {

};