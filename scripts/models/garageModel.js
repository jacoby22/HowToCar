(function(module) {

  Handlebars.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
      accum += block.fn(i);
    return accum;
  });

  var garage = {};

  function ParkedCar(data, splitCar, car) {
    this.make = splitCar[0];
    this.model = splitCar[1];
    this.year = splitCar[2];
    this.id = splitCar[3];
    this.content = car;
    this.maintenance = data.actionHolder;
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

  garage.getCarMaintenance = function(callback, splitCar, car) {
    $.get('/maintenance/actionrepository/findbymodelyearid', {modelyearid: splitCar[3]})
    .then(function(data) {
      garage.allParkedCars.push(new ParkedCar(data, splitCar, car));
    }).then(function() {
      var currentCar = garage.allParkedCars[(garage.allParkedCars.length) - 1];
      console.log(currentCar);
      var listItem = renderCar(currentCar);
      $('#car').append(listItem);
      currentCar.maintenance.forEach(function(maintItem) {
        var maintElem = renderMaintenace(maintItem);
        $('#car-template').append(maintElem);
      });
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
        garage.getCarMaintenance(callback, splitCar, car);
      });
    });

      // $('#maintenance-list').append(listMaintenance);
  };

  // garage.showGarage = function() {
  //   var listMaintenance = render(garage.savedCarMaintenance[0][1][2][3][4][6][0][0]);
  //   console.log(garage.savedCarMaintenance.length);
  //   $('#maintenance').append(listMaintenance);
  // }; // TODO : COULD BE USED TO MAKE BOTH CALLS AT ONCE AND/OR JUST MAKE A "MORE INFO" TAG TO EXTEND MAINT INFO

  module.garage = garage;
})(window);
