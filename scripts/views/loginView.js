(function(module) {
  var loginView = {};

  loginView.show = function() {
    $('.tab-content').hide();
    $('#loginButton').show();
    $('#addToCalendar').hide();
  };

  module.loginView = loginView;

})(window);
