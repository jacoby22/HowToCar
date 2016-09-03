(function(module) {
  var loginView = {};

  loginView.show = function() {
    $('.tab-content').hide();
    $('#login').show();
  };

  module.loginView = loginView;

})(window);
