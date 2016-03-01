var express = require('express');
var users = express.Router();
var bodyParser = require('body-parser');
var db = require('./../db/pg');
var session = require('express-session');
var methodOverride = require('method-override')

users.use(methodOverride('_method'));

users.get('/edit', function(req, res) {
  res.render('users/edit.html.ejs', {user:req.session.user});
})

users.put('/edit', db.editProfile, (req, res) => {
  req.method = 'get';
  res.writeHead(302, {location: '/../../users/' + req.session.user.members_id, user: req.session.user});
  res.end();  });


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


  req.session.save(function() {
    res.redirect('/users/' + req.session.user.members_id)
  });
})

users.get('/:members_id', db.getMember, db.displayFriends, (req, res) => {
  res.render('pages/show.ejs', {member: res.members[0], friends: res.friends, user:req.session.user});
  console.log("FRIENDS: ", res.friends);

});

users.delete('/logout', function(req, res) {
  req.session.destroy(function(err){
    res.redirect('/');
  })
})
















module.exports = users;
