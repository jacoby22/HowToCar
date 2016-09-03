var requestProxy = require('express-request-proxy'),
  express = require('express'),
  pg = require('pg'),
  port = process.env.PORT || 3000,
  app = express();

// pg.defaults.ssl = true;

app.get('/db', function(response, request) {
  var db_url = process.env.DATABASE_URL;

  var client = new pg.Client(db_url);
  // client.ssl = true;
  client.connect(function (err) {
    if (err) throw err;

    client.query('Select * FROM test_table', function(err, result) {
      if (err) throw err;

      console.log(result);
      response.send(result);
      client.end(function(err) {
        if (err) throw err;
      });
    });
  });
});


// app.get('/vehicle/*', function(request, response) {
//   console.log('Routing Edmunds API request');
//   var url = 'https://api.edmunds.com/api' + request.originalUrl;
//   (requestProxy({
//     url: url,
//     query: {
//       fmt: 'json',
//       api_key: process.env.EDMUNDS_KEY
//     }
//   }))(request, response);
// });
//
// app.get('/maintenance/actionrepository/findbymodelyearid/', function(request, response) {
//   console.log('Routing Edmunds API request');
//   var url = 'https://api.edmunds.com/v1/api' + request.originalUrl;
//   (requestProxy({
//     url: url,
//     query: {
//       modelyearid: '3269',
//       fmt: 'json',
//       api_key: process.env.EDMUNDS_KEY
//     }
//   }))(request, response);
// });
//

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New Request: ', request.url);
  response.sendFile('index.html', {root: '.' });
});


app.listen(port, function() {
  console.log('Server started on port ' + port + '.');
});
