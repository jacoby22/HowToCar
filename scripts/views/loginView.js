(function(module) {
  var loginView = {};

  loginView.show = function() {
    $('.tab-content').hide();
    $('#loginButton').show();
    $('#addToCalendar').hide();
    $('button#push-to-garage').hide();
    $('#edmundsLegal').hide();
  };

  module.loginView = loginView;

})(window);
