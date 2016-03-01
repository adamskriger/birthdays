// 'use strict'
var multiparty = require('multiparty');
var express = require('express');
var router = express.Router();
var db = require('../db/pg');
var s3 = require('s3');


var params = {
  localFile: "files.avatar[0].path",

  s3Params: {
    Bucket: "birthdaysproject",
    Key: "some/remote/file",
    // other options supported by putObject, except Body and ContentLength.
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
  },
};
var uploader = client.uploadFile(params);
uploader.on('error', function(err) {
  console.error("unable to upload:", err.stack);
});
uploader.on('progress', function() {
  console.log("progress", uploader.progressMd5Amount,
            uploader.progressAmount, uploader.progressTotal);
});
uploader.on('end', function() {
  console.log("done uploading");
});
var papercut = require('papercut');

var papercut = require('papercut');
  papercut.configure('production', function(){
  papercut.set('storage', 's3')
  papercut.set('S3_KEY', process.env.S3_KEY)
  papercut.set('S3_SECRET', process.env.S3_SECRET)
  papercut.set('bucket', 'birthdaysproject')
});

var AvatarUploader = papercut.Schema(function(schema){
  schema.version({
    name: 'avatar',
    size: '200x200',
    process: 'crop'
  });

  schema.version({
    name: 'small',
    size: '50x50',
    process: 'crop'
  });
});


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

// router.get('/avatar', (req, res) => {
//   res.render('pages/avatar.html.ejs');
// });
//
//
// router.post ('/avatar', (req, res) => {
//     uploader = new AvatarUploader();
//     form = new multiparty.Form()
//     form.parse(req, function(err, fields, files) {
//       // eval(pry.it)
//
//       uploader.process(files.avatar[0].originalFilename, files.avatar[0].path, function(err, images){
//             console.log(images);
//             // {
//             //  thumbnail: '/images/upload/412341-thumbnail.jpg',
//             //  large: '/images/upload/412341-large.jpg',
//             //  origin: '/images/upload/412341-origin.jpg'
//             // }
//           });
//     })
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
