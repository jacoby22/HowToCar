(function(module) {

  var garageView = {};

  garageView.show = function() {
    $('.tab-content').hide();
    $('#loginButton').hide();
    $('#addToCalendar').show();
    $('#garage').show();
    $('#searchGarageFooter').show();
    $('#generalFooter').hide
    $('button#push-to-garage').hide();
  };

  module.garageView = garageView;

})(window);
