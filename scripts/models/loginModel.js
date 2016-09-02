(function(module) {

  var login = {};

  login.test = function() {
    $.get('/db')
    .done(function(data) {
      console.log('hello');
    });
  };

  module.login = login;

})(window);
