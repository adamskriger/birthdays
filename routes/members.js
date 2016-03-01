// 'use strict'

var express = require('express');
var router = express.Router();
var db = require('../db/pg');





router.get('/all', db.getMembers,  (req, res) => {
  console.log(req.session.user.members_id)
  console.log("res.members[0]: ", res.members[0]);
  res.render('pages/members.html.ejs', {members: res.members, me: req.session.user.members_id, user: req.session.user});
});

router.post('/all', db.addFriend,db.getMember, (req, res) => {
  req.method = 'get';
  res.writeHead(302, {location: '/../../users/' + req.session.user.members_id, user: req.session.user});
  res.end();
});



router.get('/:members_id', db.getMember, db.displayFriends, (req, res) => {
  console.log("FRIENDS: ", friends);
  res.render('pages/show.ejs', {member: res.members[0], friends: res.friends, user: req.session.user});
});


router.post('/message', db.sendMessage, (req, res) => {
  req.method = 'get';
  res.writeHead(302, {location: '/../../users/' + req.session.user.members_id, user: req.session.user});
  res.end();});


  // router.put('/edit', db.editProfile, (req, res) => {
  //
  //   });



module.exports = router;
