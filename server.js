var dotenv = require('dotenv');
pry = require('pryjs');
var path = require('path');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
// var papercut = require('papercut');
// var papercut = require('./')
// var async = require('async');
// var knox = require('knox');
// var imagemagick = require('imagemagick')
///Log-in Stuff Appears Below:
var config = "postgres://Adam1:Move2core@localhost/birthdays";
var pg = require('pg');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var session = require('express-session');
var app = express();
var userRoutes = require( path.join(__dirname, '/routes/users'));
var session = require('express-session');
var pgSession = require('connect-pg-simple')(session);
var membersRouter = require('./routes/members');
var s3 = require('s3');
var AWS = require('aws-sdk');











AWS.config = new AWS.Config();
AWS.config.accessKeyId = "AKIAJUHX7LZLFQ7FVRIA";
AWS.config.secretAccessKey = "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";
AWS.config.region = "us-east-1";
AWS.config.endpoint = "storagegateway.us-east-1.amazonaws.com"
AWS.config.credentials = "credentials";







//
// var client = knox.createClient({
//     key: 'AKIAJUHX7LZLFQ7FVRIA',
//     secret: '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',
//     bucket: 'birthdaysproject'
// });

// client.deleteFile('/birthdaysproject', function(err, res){
//     console.log('Clip delete err :',err,', Clip path :', 'birthdaysproject/');
// });

dotenv.load();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
  store: new pgSession({
    pg : pg,
    conString : config,
    tableName : 'session'
  }),
  secret : 'soooosecreetttt',
  resave : false,
  saveUninitialized: true,
  cookie : { maxAge : 30 * 24 * 60 * 60 * 1000 } // 30 days
}))


app.use(morgan('dev'));

app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, './public/')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/users', userRoutes)
app.use('/members', membersRouter);

//
// var client = s3.createClient({
//   maxAsyncS3: 20,     // this is the default
//   s3RetryCount: 3,    // this is the default
//   s3RetryDelay: 1000, // this is the default
//   multipartUploadThreshold: 20971520, // this is the default (20 MB)
//   multipartUploadSize: 15728640, // this is the default (15 MB)
//   s3Options: {
//     accessKeyId: "AKIAJUHX7LZLFQ7FVRIA",
//     secretAccessKey: "R5UBez5Rw1DAczgL/qpBHuO63rOkcF6okCAY90TF",
//     region: "Oregon",
//     // endpoint: 's3.yourdomain.com',
//     // sslEnabled: false
//     // any other options are passed to new AWS.S3()
//     // See:

// papercut
// configure = (function(){
//   papercut.set('storage', 'file')
//   papercut.set('directory', './images/uploads')
//   papercut.set('url', '/images/uploads')
// });
//
// papercut = function(){
//   papercut.set('storage', 's3')
//   papercut.set('S3_KEY', process.env.S3_KEY)
//   papercut.set('S3_SECRET', process.env.S3_SECRET)
//   papercut.set('bucket', 'birthdaysproject')
// };

// eval(pry.it)

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
//
// var uploader = new AvatarUploader();

// var pc = function(images){
//   console.log(images.avatar); // '/images/uploads/image1-avatar.jpg'
//   console.log(images.small); // '/images/uploads/image1-small.jpg'
// }

  ////papercut

app.get('/', function(req, res) {
  console.log("LOG4: ", req.session);
  res.render('home.html.ejs', { user : req.session.user});
})







app.listen(process.env.PORT, function() {
  console.log(`Listening on port ${process.env.PORT}`);
});
