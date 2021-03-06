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
// console.log("LOG2: ", results.rows);
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
  var member_name = req.body.member_name;
  var birthday = req.body.birthday;
  function saveUser(email, hash) {
    pg.connect(config, function(err, client, done) {
      if (err) {
        done()
        console.log(err)
        return res.status(500).json({success: false, data: err})
      }

      var query = client.query("INSERT INTO members( email, password_digest, member_name, birthday) VALUES ($1, $2, $3, $4);", [email, hash, member_name, birthday], function(err, result) {
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
    // console.log(req.session.user);
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

    client.query('SELECT * FROM members WHERE members_id = $1', [req.session.user.members_id], (err, results) => {
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
      m.member_name AS friend_name,
      m.email AS friend_email,
      m.birthday AS friend_birthday
      FROM friends AS f
      INNER JOIN members AS m
      on f.friend_id = m.members_id
      and f.members_id = $1
      INNER JOIN members m1
      ON f.members_id = m1.members_id;`,[req.session.user.members_id], (err, results) => {
      done();

      if (err) {
        console.error('Error with query', err);
      }
      // console.log("results.rows: ",  results.rows );
      // console.log("res.members: ",  res.members);
console.log(res.friends);
      res.friends = results.rows;
      next();
    });
  });

};


module.exports.addFriend = (req, res, next) => {
  console.log('adding friend')
  pg.connect(config, (err, client, done) => {
    if (err) {
      done();
      // console.log(err);
      // console.log(req.body);
      // console.log(members);
      res.status(500).json({success: false, data: err});
    }
    console.log("req.sessions.user.id", req.session.user.members_id );
    client.query('INSERT INTO friends (members_id, friend_id) VALUES ($1, $2)', [req.session.user.members_id, req.body.friend_id], (err, results) => {
      console.log("req.body.friend_id: ", req.body.friend_id);



      done();

      if (err) {
        console.error('Error with query', err);
      }

      // res.rows = results.rows;
      next();
    });
  });

}

module.exports.sendMessage = (req, res, next) => {
  pg.connect(config, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      res.status(500).json({success: false, data: err});
    }

    client.query(`INSERT into messages (sender_id, members_id, message) VALUES ($1, $2, $3) `,[req.session.user.members_id, req.body.friend_id, req.body.message], (err, results) => {
      done();

      if (err) {
        console.error('Error with query', err);
      }
      // console.log("results.rows: ",  results.rows );
      // console.log("res.members: ",  res.members);

      res.friends = results.rows;
      next();
    });
  });

};

//

// module.exports.editProfile = (req, res, next) => {
//   pg.connect(config, (err, client, done) => {
//     if (err) {
//       done();
//       console.log(err);
//       res.status(500).json({success: false, data: err});
//     }
//
//
//     client.query(`UPDATE members SET (member_name, password_digest, email, birthday) VALUES ($1, $2, $3, $4) WHERE members.members_id = req.session.user`,  [req.body.member_name, req.body.password_digest, req.body.email, req.body.birthday], (err, results) => {
//       done();
//
//       if (err) {
//         console.error('Error with query', err);
//       }
//
//       next();
//     });
//
//   });
//
// };

module.exports.editProfile = (req, res, next) => {
  pg.connect(config, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      res.status(500).json({success: false, data: err});
    }


    client.query('UPDATE members SET member_name = $1, email = $2, birthday = $3 WHERE members_id = $4', [req.body.member_name, req.body.email, req.body.birthday, req.session.user.members_id], (err, results) => {
      done();

      if (err) {
        console.error('Error with query', err);
      }

      next();
    });

  });

};
