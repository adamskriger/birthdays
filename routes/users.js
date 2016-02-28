var express = require('express');
var users = express.Router();
var bodyParser = require('body-parser');
var db = require('./../db/pg');
var session = require('express-session');


users.post('/', db.createUser, function(req, res){
  res.redirect('/');
})

// users.route('/')
users.get('/new', function(req, res) {
  res.render('users/new.html.ejs', {user:req.session.user})
})

users.get('/login', function(req, res) {
  res.render('users/login.html.ejs', {user:req.session.user});
})

users.post('/login', db.loginUser, function(req, res) {
  req.session.user = res.rows

  // when you redirect you must force a save due to asynchronisity
  // https://github.com/expressjs/session/issues/167 **
  // "modern web browsers ignore the body of the response and so start loading
  // the destination page well before we finished sending the response to the client."

  req.session.save(function() {
    res.redirect('/users/' + req.session.user.members_id)
  });
})

users.get('/:members_id', db.getMember, db.displayFriends, (req, res) => {
  res.render('pages/show.ejs', {member: res.members[0], friends: res.friends, user:req.session.user});
});

users.delete('/logout', function(req, res) {
  req.session.destroy(function(err){
    res.redirect('/');
  })
})
















module.exports = users;
