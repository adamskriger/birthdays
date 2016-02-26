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

      res.members = results.rows;
      next();
    });
  });

};
