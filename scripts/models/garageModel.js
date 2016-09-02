(function(module) {

var garage = {};

var render = function(carData) {
    var garageTemplate = Handlebars.compile($('#car-template').html());

    return garageTemplate(carData)
  };

  module.garage = garage;
})(window);
