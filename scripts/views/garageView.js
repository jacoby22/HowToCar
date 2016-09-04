(function(module) {

  var garageView = {};

  garageView.show = function() {
    $('.tab-content').hide();
    $('#garage').show();
  };
  var renderCar = function(carData) {
    var garageTemplate = Handlebars.compile($('#car-template').html());

    return garageTemplate(carData);
  };

  garage.showCar = function() {
    var listItem = renderCar(garage.savedCars);
    console.log(garage.savedCars);
    $('#car').append(listItem);
  };

  garage.showCar();

  module.garageView = garageView;

})(window);
