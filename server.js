var requestProxy = require('express-request-proxy'),
  express = require('express'),
  pg = require('pg'),
  pug = require('pug'),
  port = process.env.PORT || 3000,
  app = express();

pg.defaults.ssl = true;

///////////////////////////////////////////////////////////////////////

var passport = require('passport');

// This will configure Passport to use Auth0
var strategy = require('./setup-passport');

// Session and cookies middlewares to keep user logged in
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(express.static('./'));
app.use(cookieParser());
// See express session docs for information on the options: https://github.com/expressjs/session
app.use(session({ secret: 'ab1FaBisHks9YbbHPhDV3iYfgMZ412Kw-87hQVsiYsqHIG_8gONEzNE4GYY-ZX6A', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());
app.set('views', './view');
app.set('view engine', 'pug');

app.get('/callback',
passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
function(req, res) {
  if (!req.user) {
    throw new Error('user null');
  }
  res.redirect('/user');
});

////////////////////////////////////////////////////////////////////////////////////////

app.get('/user', function (req, res) {
  var client = new pg.Client(process.env.DATABASE_URL);
  client.connect(function(err) {
    if (err) throw err;
    client.query('INSERT INTO garage (email) values ($1)', [req.user._json.email], function(err, result) {
      if (err) throw err;
      client.end(function(err) {
        if (err) throw err;
      });
    });
  });
  res.render('user', {
    user: req.user
  });
});

app.get('/addCar', function(req, res) {
  var formattedCar = '{' + req.query.currentCar.make + '/' + req.query.currentCar.model + '/' + req.query.currentCar.year + '/' + req.query.currentCar.id + '}';
  var client = new pg.Client(process.env.DATABASE_URL);
  client.connect(function(err) {
    if (err) throw err;
    client.query('UPDATE garage SET cars = cars || $1 WHERE email=$2', [formattedCar, req.query.email],function(err, result) {
      if (err) throw err;
      client.end(function(err) {
        if (err) throw err;
      });
    });
  });
});

app.get('/getCars', function(req, res) {
  var client = new pg.Client(process.env.DATABASE_URL);
  client.connect(function(err) {
    if (err) throw err;
    client.query('SELECT cars FROM garage WHERE email=$1', [req.query.email], function(err, result) {
      if (err) throw err;
      res.send(result.rows[0].cars);
      client.end(function(err) {
        if (err) throw err;
      });
    });
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////

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
  var shit = request.query['modelyearid'];
  var url = 'https://api.edmunds.com/v1/api/maintenance/actionrepository/findbymodelyearid';
  (requestProxy({
    url: url,
    query: {
      modelyearid: shit,
      fmt: 'json',
      api_key: process.env.EDMUNDS_KEY
    }
  }))(request, response);
});

app.get('/media/v2/*', function(request, response) {
  console.log('Routing Edmunds API photo request');
  var url = 'https://api.edmunds.com/api' + request.originalUrl;
  (requestProxy({
    url: url,
    query: {
      api_key: process.env.EDMUNDS_KEY,
      fmt: 'json'
    }
  }))(request, response);
});

app.get('*', function(request, response) {
  console.log('New Request: ', request.url);
  response.sendFile('index.html', {root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '.');
});
