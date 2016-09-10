(function(module) {

  var garageView = {};

  garageView.show = function() {
    $('.tab-content').hide();
    $('#loginButton').hide();
    $('#addToCalendar').show();
    $('#garage').show();
    $('button#push-to-garage').hide();
  };

  garageView.setTeasers = function() {
    $('#car-maintenance *:nth-of-type(n+5)').hide();
  };

  garageView.setTeasers();

  module.garageView = garageView;

})(window);
