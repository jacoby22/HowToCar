(function(module) {

  var garage = {};

  garage.savedCarMaintenance = [];
  garage.savedCars = [];

  var render = function(carData) {
    var garageTemplate = Handlebars.compile($('#car-template').html());

    return garageTemplate(carData);
  };

  module.garage = garage;
})(window);
