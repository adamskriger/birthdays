// 'use strict'

var express = require('express');
var router = express.Router();
var db = require('../db/pg');





router.get('/all/:members_id/', db.getMembers,  (req, res) => {
  res.render('pages/members.html.ejs', {members: res.members});
});

router.post('/all/:members_id/', db.addFriend, (req, res) => {
  // console.log("This is the post being hit ");
  res.redirect('/all/:members_id/'); 
});


router.get('/:members_id', db.getMember, db.displayFriends, (req, res) => {
  res.render('pages/show.ejs', {member: res.members[0], friends: res.friends});
});








module.exports = router;
