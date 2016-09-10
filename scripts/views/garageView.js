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
    $('#car-maintenance li:nth-of-type(n+5)').hide();
    console.log('working');
  };

  module.garageView = garageView;

})(window);
