// 'use strict'

var express = require('express');
var router = express.Router();
var db = require('../db/pg');





router.get('/all', db.getMembers,  (req, res) => {
  console.log(req.session.user.members_id)
  console.log("res.members[0]: ", res.members[0]);
  res.render('pages/members.html.ejs', {members: res.members, me: req.session.user.members_id});
});

router.post('/all', db.addFriend, (req, res) => {
  console.log("res.members addFriend: ", res.members);

  res.redirect('pages/members.html.ejs',{members: res.members} );
});


router.get('/:members_id', db.getMember, db.displayFriends, (req, res) => {
  res.render('pages/show.ejs', {member: res.members[0], friends: res.friends});
});








module.exports = router;
