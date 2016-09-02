var requestProxy = require('express-request-proxy'),
  express = require('express'),
  pg = require('pg'),
  port = process.env.PORT || 3000,
  app = express();


app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New Request: ', request.url);
  response.sendFile('index.html', {root: '.' });
});

// pg.defaults.ssl = true;
app.get('/db', function(response, request) {
  console.log('started');
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('Select * FROM test_table', function(err, result) {
      done();
      if (err) {
        console.error(err);
        response.send('Error ' + err);
      } else {
        console.log('Success');
        response.render('pages/db', {results: result.rows});
      }
    });
  });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '.');
});
