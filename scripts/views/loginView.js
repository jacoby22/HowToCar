(function(module) {
  var loginView = {};

  loginView.show = function() {
    $('.tab-content').hide();
    $('#loginButton').show();
    $('#addToCalendar').hide();
    $('#edmundsLegal').hide();
    $('#homeFooter').show();
    $('#generalFooter').hide();
    $('button#push-to-garage').hide();
  };

  module.loginView = loginView;

})(window);
