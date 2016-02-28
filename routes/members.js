// 'use strict'

var express = require('express');
var router = express.Router();
var db = require('../db/pg');





router.get('/all', db.getMembers,  (req, res) => {
  console.log(req.session.user.members_id)
  res.render('pages/members.html.ejs', {members: res.members, me: req.session.user.members_id});
});

router.post('/all', db.addFriend, (req, res) => {
  // console.log("This is the post being hit ");
  res.redirect('members/all',{members: res.members} );
});


router.get('/:members_id', db.getMember, db.displayFriends, (req, res) => {
  res.render('pages/show.ejs', {member: res.members[0], friends: res.friends});
});








module.exports = router;
