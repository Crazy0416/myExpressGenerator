const express = require('express');
const router = express.Router();
const member = require('../models/member');

/* GET home page. */
router.get('/', function(req, res, next) {
  debugger;
  member.create({
     name: "Kim MinHo",
     createOn: Date.now()
  }, (err, member) => {
    console.log("create member: ", member);
    res.render('index', { title: 'Express' });
  });
});

module.exports = router;
