// 'use strict'

var express = require('express');
var router = express.Router();
var db = require('../db/pg');





router.get('/all', db.getMembers,  (req, res) => {
  console.log(req.session.user.members_id)
  console.log("res.members[0]: ", res.members[0]);
  res.render('pages/members.html.ejs', {members: res.members, me: req.session.user.members_id});
});

router.post('/all', db.addFriend,db.getMember, (req, res) => {
  req.method = 'get';
  res.writeHead(302, {location: '/../../users/' + req.session.user.members_id});
  res.end();
});



router.get('/:members_id', db.getMember, db.displayFriends, (req, res) => {
  res.render('pages/show.ejs', {member: res.members[0], friends: res.friends});
});








module.exports = router;
