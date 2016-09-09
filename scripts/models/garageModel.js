(function(module) {

  var garage = {};

  garage.savedCars = [];

  var renderMaintenace = function(carData) {
    // console.log(carData);
    var garageTemplateMaintenance = Handlebars.compile($('#maintenance-template').html());
    // console.log(garageTemplateMaintenance)
    return garageTemplateMaintenance(carData);
  };
  var renderCar = function(carData) {
    var garageTemplate = Handlebars.compile($('#car-template').html());
    // console.log(carData);
    return garageTemplate(carData);
  };

  garage.getCarMaintenance = function(callback, carId) {
    $.get('/maintenance/actionrepository/findbymodelyearid', {modelyearid: carId})
    .done(function(data, carId) {
    //   var listMaintenance = renderMaintenace(data);
    //   var listItem = renderCar(garage.savedCars[0]);
    //   $('#car').append(listItem);
    //   $('#maintenance-list').append(listMaintenance);
    });
  };

  garage.showCar = function(callback) {
    var userEmail = localStorage.getItem('currentUser');
    $.get('/getCars', {email: userEmail})
    .done(function(data) {
      console.log(data);
      data.forEach(function(car) {
        string.split(car, '/');
        console.log(car);
        // garage.getCarMaintenance(callback, car);
      });
    });
  };

  // garage.showGarage = function() {
  //   var listMaintenance = render(garage.savedCarMaintenance[0][1][2][3][4][6][0][0]);
  //   console.log(garage.savedCarMaintenance.length);
  //   $('#maintenance').append(listMaintenance);
  // }; // TODO : COULD BE USED TO MAKE BOTH CALLS AT ONCE AND/OR JUST MAKE A "MORE INFO" TAG TO EXTEND MAINT INFO

  module.garage = garage;
})(window);
