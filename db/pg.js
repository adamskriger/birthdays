// 'use strict'
var pg = require('pg');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var session = require('express-session');

// var config = {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS
// };

var config = "postgres://Adam1:Move2core@localhost/birthdays";

/////functions for log-in/////////
function loginUser(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    pg.connect(config, function(err, client, done) {
      if (err) {
        done()
        console.log(err)
        return res.status(500).json({success: false, data: err})
      }

      var query = client.query("SELECT * FROM members WHERE email LIKE ($1);", [email], function(err, results) {
        done()
        if (err) {
          return console.error('error running query', err)
        }

        if (results.rows.length === 0) {
          res.status(204).json({success: true, data: 'no content'})
        } else if (bcrypt.compareSync(password, results.rows[0].password_digest)) {
          res.rows = results.rows[0]
          next()
        }
      })
    })
}

//// 2/////
function createSecure(email, password, callback) {
  // hashing the password given by the user at signup
  bcrypt.genSalt(function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      // this callback saves the user to our databased
      // with the hashed password

      // saveUser(email, hashed)
      callback(email, hash)
    })
  })
}

///3 /////

function createUser(req, res, next) {
  createSecure(req.body.email, req.body.password, saveUser);

  function saveUser(email, hash) {
    pg.connect(config, function(err, client, done) {
      if (err) {
        done()
        console.log(err)
        return res.status(500).json({success: false, data: err})
      }

      var query = client.query("INSERT INTO members( email, password_digest) VALUES ($1, $2);", [email, hash], function(err, result) {
        done()
        if (err) {
        return console.error('error running query', err)
        }
        next()
      })
    })
  }
}

module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
// module.exports.createSecure = createSecure;


///// end functions for log-in/////////

module.exports.getMembers = (req, res, next) => {
  pg.connect(config, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      res.status(500).json({success: false, data: err});
    }

    client.query('SELECT * from members;', (err, results) => {
      done();

      if (err) {
        console.error('Error with query', err);
      }

      res.members = results.rows;
      next();
    });
  });
};

module.exports.getMember = (req, res, next) => {
  pg.connect(config, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      res.status(500).json({success: false, data: err});
    }

    client.query('SELECT * FROM members WHERE members_id = $1', [req.params.members_id], (err, results) => {
      done();

      if (err) {
        console.error('Error with query', err);
      }
      // console.log("This is results.rows", results.rows);
      res.members = results.rows;
      next();
    });
  });

};

module.exports.displayFriends = (req, res, next) => {
  pg.connect(config, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      res.status(500).json({success: false, data: err});
    }

    client.query(`SELECT m1.member_name,
      m.members_id AS friend_id,
      m.member_name AS friend_name
      FROM friends AS f
      INNER JOIN members AS m
      on f.friend_id = m.members_id
      and f.members_id = $1
      INNER JOIN members m1
      ON f.members_id = m1.members_id;`,[req.params.members_id], (err, results) => {
      done();

      if (err) {
        console.error('Error with query', err);
      }
      console.log("results.rows: ",  results.rows );
      console.log("res.members: ",  res.members);

      res.friends = results.rows;
      next();
    });
  });

};


module.exports.addFriend = (req, res, next) => {
  pg.connect(config, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      res.status(500).json({success: false, data: err});
    }

    client.query('INSERT INTO friends (members_id, members_id) VALUES ($1, $2)', [req.params.members_id, req.body.name], (err, results) => {
      done();

      if (err) {
        console.error('Error with query', err);
      }

      res.massages = results.rows;
      next();
    });
  });

};
