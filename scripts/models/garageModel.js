(function(module) {

  var garage = {};

  function ParkedCar(data, car) {
    this.make = car[0];
    this.model = car[1];
    this.year = car[2];
    this.id = car[3];
    this.maintenance = data;
  }

  garage.allParkedCars = [];

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

  garage.getCarMaintenance = function(callback, splitCar) {
    $.get('/maintenance/actionrepository/findbymodelyearid', {modelyearid: splitCar[3]})
    .then(function(data) {
      garage.allParkedCars.push(new ParkedCar(data, splitCar));
    });
    //   var listMaintenance = renderMaintenace(data);
    //   var listItem = renderCar(garage.savedCars[0]);
    //   $('#car').append(listItem);
    //   $('#maintenance-list').append(listMaintenance);
  };

  garage.showCar = function(callback) {
    var userEmail = localStorage.getItem('currentUser');
    $.get('/getCars', {email: userEmail})
    .done(function(data) {
      data.forEach(function(car) {
        var splitCar = car.split('/');
        garage.getCarMaintenance(callback, splitCar);
      });
    }).done(function() {
      debugger;
      console.log(garage.allParkedCars);

      console.log(garage['allParkedCars'][0]);
      console.log(garage.allParkedCars[1]);
      console.log(garage.allParkedCars[2]);

      // for (var i = 0; i < garage.allParkedCars.length; i++) {
      //   console.log(garage.allParkedCars[i]);
      // }
      // garage.allParkedCars.forEach(function(parkedCar) {
      //   console.log(parkedCar);
      // });
      // var listItem = renderCar(garage.allParkedCars[0]);
      // $('#car').append(listItem);
      // $('#maintenance-list').append(listMaintenance);

    });
  };

  // garage.showGarage = function() {
  //   var listMaintenance = render(garage.savedCarMaintenance[0][1][2][3][4][6][0][0]);
  //   console.log(garage.savedCarMaintenance.length);
  //   $('#maintenance').append(listMaintenance);
  // }; // TODO : COULD BE USED TO MAKE BOTH CALLS AT ONCE AND/OR JUST MAKE A "MORE INFO" TAG TO EXTEND MAINT INFO

  module.garage = garage;
})(window);
