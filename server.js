require('dotenv').config();

var path = require('path');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var papercut = require('papercut');

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

app.use(express.static('./public/'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/users', userRoutes)
app.use('/members', membersRouter);



app.get('/', function(req, res) {
  console.log("LOG4: ", req.session);
  res.render('home.html.ejs', { user : req.session.user});
})







app.listen(process.env.PORT, function() {
  console.log(`Listening on port ${process.env.PORT}`);
});
