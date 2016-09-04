(function(module) {

  var garageView = {};

  garageView.show = function() {
    $('.tab-content').hide();
    $('#garage').show();
  };

  module.garageView = garageView;

})(window);
