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
    $('#car-maintenance').each(function() {
      $(this).children('li:gt(5)').hide();
      console.log($('#car-maintenance').length);
    });
  };

  module.garageView = garageView;

})(window);
