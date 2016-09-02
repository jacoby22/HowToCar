var requestProxy = require('express-request-proxy'),
  express = require('express'),
  port = process.env.PORT || 3000,
  app = express();

app.use(express.static('./'));

app.get('/vehicle/*', function(request, response) {
  console.log('Routing Edmunds API request');
  // console.log(request.params[0]);
  // console.log(request.originalUrl);
  // console.log(process.env.EDMUNDS_KEY);
  var url = 'https://api.edmunds.com/api' + request.originalUrl
  console.log(url);
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

app.listen(port, function() {
  console.log('Server started on port ' + port + '.');
});
