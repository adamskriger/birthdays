// 'use strict'
var pg = require('pg');

// var config = {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS
// };

var config = "postgres://Adam1:Move2core@localhost/birthdays";

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
      console.log("This is results.rows", results.rows);
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
