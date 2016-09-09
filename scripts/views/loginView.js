(function(module) {
  var loginView = {};

  loginView.show = function() {
    $('.tab-content').hide();
    $('#loginButton').show();
    $('#addToCalendar').hide();
    $('#edmundsLegal').hide();
  };

  module.loginView = loginView;

})(window);
