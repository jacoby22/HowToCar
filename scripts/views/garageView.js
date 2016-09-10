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
    $('.car-maintenance li').splice(5).hide();
  };

  module.garageView = garageView;

})(window);
