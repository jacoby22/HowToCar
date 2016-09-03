var requestProxy = require('express-request-proxy'),
  express = require('express'),
  pg = require('pg'),
  port = process.env.PORT || 3000,
  app = express();

pg.defaults.ssl = true;

function create (user, callback) {
  //this example uses the "pg" library
  //more info here: https://github.com/brianc/node-postgres
  var conString = process.env.DATABASE_URL;

  postgres(conString, function (err, client, done) {
    if (err) {
      console.log('could not connect to postgres db', err);
      return callback(err);
    }

    var hashedPassword = bcrypt.hashSync(user.password, 10);

    var query = 'INSERT INTO users(email, password) VALUES ($1, $2)';

    client.query(query, [user.email, hashedPassword], function (err, result) {
      // NOTE: always call `done()` here to close
      // the connection to the database
      done();

      if (err) {
        console.log('error executing query', err);
        return callback(err);
      }

      if (result.rows.length === 0) {
        return callback();
      }

      callback(null);
    });
  });
}

function login (email, password, callback) {
  //this example uses the "pg" library
  //more info here: https://github.com/brianc/node-postgres

  var conString = process.env.DATABASE_URL;
  postgres(conString, function (err, client, done) {
    if (err) {
      console.log('could not connect to postgres db', err);
      return callback(err);
    }

    var query = 'SELECT id, nickname, email, password ' +
                'FROM users WHERE email = $1';

    client.query(query, [email], function (err, result) {
      // NOTE: always call `done()` here to close
      // the connection to the database
      done();

      if (err) {
        console.log('error executing query', err);
        return callback(err);
      }

      if (result.rows.length === 0) {
        return callback();
      }

      var user = result.rows[0];

      if (!bcrypt.compareSync(password, user.password)) {
        return callback();
      }

      callback(null, {
        id:         user.id,
        nickname:   user.nickname,
        email:      user.email
      });


    });
  });
}

// app.get('/db', function(req, res) {
//   var db_url = process.env.DATABASE_URL;
//
//   var client = new pg.Client(db_url);
//
//   client.connect(function (err) {
//     if (err) throw err;
//
//     client.query('Select * FROM users', function(err, result) {
//       if (err) throw err;
//
//       console.log(res);
//       client.end(function(err) {
//         if (err) throw err;
//       });
//       res.send(result.rows);
//     });
//   });
// });

app.get('/vehicle/*', function(request, response) {
  console.log('Routing Edmunds API request');
  var url = 'https://api.edmunds.com/api' + request.originalUrl;
  (requestProxy({
    url: url,
    query: {
      fmt: 'json',
      api_key: process.env.EDMUNDS_KEY
    }
  }))(request, response);
});

app.get('/maintenance/actionrepository/findbymodelyearid/', function(request, response) {
  console.log('Routing Edmunds API request');
  var url = 'https://api.edmunds.com/v1/api' + request.originalUrl;
  (requestProxy({
    url: url,
    query: {
      modelyearid: '3269',
      fmt: 'json',
      api_key: process.env.EDMUNDS_KEY
    }
  }))(request, response);
});

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New Request: ', request.url);
  response.sendFile('index.html', {root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '.');
});
