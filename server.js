var requestProxy = require('express-request-proxy'),
  express = require('express'),
  pg = require('pg'),
  port = process.env.PORT || 3000,
  app = express();

pg.defaults.ssl = true;

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

// $.ajax({
//   url: 'https://app55939845.auth0.com/api/v2/users',
//   type: 'GET',
//   headers: {'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJuTGxGRzE3RmZ1cmZiWEhkQVRMazAxVnFHUUt1S0g5TiIsInNjb3BlcyI6eyJ1c2VycyI6eyJhY3Rpb25zIjpbInJlYWQiXX19LCJpYXQiOjE0NzI5NDQwODUsImp0aSI6ImUzZDRkZTBjZjNhNjlkMDQzMWQ4ZjI0NDY1N2ZjYjIwIn0.qDhaZprCScbugsJofUrDI6KajgQqYBx671wpCZT8CwU"},
//   success: function(data) {
//     console.log(data);
//   }
// });

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New Request: ', request.url);
  response.sendFile('index.html', {root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '.');
});
