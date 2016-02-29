// 'use strict'
var multiparty = require('multiparty');
var express = require('express');
var router = express.Router();
var db = require('../db/pg');
var AWS = require('aws-sdk');




// var papercut = require('papercut');

// var papercut = require('papercut');
//   papercut.configure('production', function(){
//   papercut.set('storage', 's3')
//   papercut.set('S3_KEY', process.env.S3_KEY)
//   papercut.set('S3_SECRET', process.env.S3_SECRET)
//   papercut.set('bucket', 'birthdaysproject')
// });

// var AvatarUploader = papercut.Schema(function(schema){
//   schema.version({
//     name: 'avatar',
//     size: '200x200',
//     process: 'crop'
//   });
//
//   schema.version({
//     name: 'small',
//     size: '50x50',
//     process: 'crop'
//   });
// });


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

router.get('/avatar', (req, res) => {
  res.render('pages/avatar.html.ejs');
});


router.post ('/avatar', (req, res) => {
      var s3 = new AWS.S3({params: {Bucket: 'birthdaysproject',
      Key: 'AKIAJUHX7LZLFQ7FVRIA'}});
      s3.listBuckets(function(err, data) {

          for (var index in data.Buckets) {
            var bucket = data.Buckets[index];
            console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
          }

      });
      var form = new multiparty.Form();

      form.parse(req, function(err, fields, files) {
        files.avatar[0]

        s3.upload({Body: params}, function (err, res) {
          if (err) {
            // eval(pry.it)
            console.log("Error uploading data: ", err);
          } else {
            console.log("Successfully uploaded data to myBucket/myKey");
          }
        });
      })
    })



router.get('/:members_id', db.getMember, db.displayFriends, (req, res) => {
  console.log("FRIENDS: ", friends);
  res.render('pages/show.ejs', {member: res.members[0], friends: res.friends, user: req.session.user});
});


router.post('/message', db.sendMessage, (req, res) => {
  req.method = 'get';
  res.writeHead(302, {location: '/../../users/' + req.session.user.members_id, user: req.session.user});
  res.end();});








module.exports = router;
