(function(module) {

  var garageView = {};

  garageView.show = function() {
    $('.tab-content').hide();
    $('#loginButton').hide();
    $('#garage').show();
  };

  module.garageView = garageView;

})(window);
