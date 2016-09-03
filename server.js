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

app.get('*', function(request, response) {
  console.log('New Request: ', request.url);
  response.sendFile('index.html', {root: '.' });
});


app.get('*/db', function(response, request) {

  var client = new Client(process.env.DATABASE_URL);

  client.connect(function (err) {
    if (err) throw err;

    client.query('Select * FROM test_table', function(err, result) {
      if (err) throw err;

      console.log(result);

      client.end(function(err) {
        if (err) throw err;
      });
    });
  });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '.');
});
