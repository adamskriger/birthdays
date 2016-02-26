var express = require('express');
var router = express.Router();
var db = require('../db/pg');





router.get('/members', db.getMembers,  (req, res) => {
  res.render('pages/members.html.ejs', {members: res.members});
});




router.get('/:members_id', db.getMember, (req, res) => {
  res.render('pages/show.ejs', {member: res.members[0]});
});


















module.exports = router;
