var express = require('express');
var router = express.Router();
var db = require('../db/pg');





router.get('/members', db.getMembers,  (req, res) => {
  res.render('pages/members.html.ejs', {members: res.members});
});























module.exports = router;
