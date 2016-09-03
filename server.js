var requestProxy = require('express-request-proxy'),
  express = require('express'),
  pg = require('pg'),
  port = process.env.PORT || 3000,
  app = express();

app.use(express.static('./'));

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

app.get('*', function(request, response) {
  console.log('New Request: ', request.url);
  response.sendFile('index.html', {root: '.' });
});

app.get('/db', function(response, request) {
  console.log('started');
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('Select * FROM test_table', function(err, result) {
      done();
      if (err) {
        console.error(err); response.send('Error ' + err);
      } else {
        console.log('something');
        response.render('pages/db', {results: result.rows});
      }
    });
  });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '.');
});
