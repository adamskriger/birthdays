// 'use strict'

var express = require('express');
var router = express.Router();
var db = require('../db/pg');





router.get('/:members_id/all', db.getMembers,  (req, res) => {
  res.render('pages/members.html.ejs', {members: res.members});
});

router.post('/:members_id/all', db.addFriend, (req, res) => {
  console.log("This is the ");
});


router.get('/:members_id', db.getMember, db.displayFriends, (req, res) => {
  res.render('pages/show.ejs', {member: res.members[0], friends: res.friends});
});








module.exports = router;