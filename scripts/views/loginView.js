(function(module) {
  var loginView = {};

  loginView.show = function() {
    $('.tab-content').hide();
    $('#loginButton').show();
  };

  module.loginView = loginView;

})(window);
