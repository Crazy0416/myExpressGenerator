const express = require('express');
const router = express.Router();
const mongoHandler = require('../modules/mongooseHandler');
const member = require('../models/member');

/* GET home page. */
router.get('/', function(req, res, next) {
  debugger;
  member.create({
     name: "Kim MinHo",
     createOn: Date.now()
  }, (err, member) => {
    if(err) console.log("ERR: ", err);

    console.log("create member: ", member);
    res.render('index', { title: 'Express' });
  });
});

router.get('/find', (req, res, next) => {
    for(let i = 0; i < 5; i++) {
        member.find({ name: "Kim MinHo"}, (err, member) => {
            if(err)
                console.log("ERR: ", err);
            else {
                console.log(member);
            }
        })
    }
    res.send('finish');
});

router.get('/fix', (req, res, next) => {

    mongoHandler.connect();
    res.send('connect!');
});

module.exports = router;
