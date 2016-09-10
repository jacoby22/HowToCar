(function(module) {

  var garage = {};

  function ParkedCar(data, splitCar, car) {
    this.make = splitCar[0];
    this.model = splitCar[1];
    this.year = splitCar[2];
    this.id = splitCar[3];
    this.content = car.replace(/\//g, '_');
    this.dataContent = car;
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
      var listItem = renderCar(currentCar);
      $('#car').append(listItem);
      currentCar.maintenance.forEach(function(maintItem) {
        var maintElem = renderMaintenace(maintItem);
        $('#' + currentCar.content + ' .car-maintenance').append(maintElem);
      });
      garageView.setTeasers();
    });
  };

  garage.showCar = function(callback) {
    $('#car').empty();
    garage.allParkedCars = [];
    var userEmail = localStorage.getItem('currentUser');
    $.get('/getCars', {email: userEmail})
    .then(function(data) {
      data.forEach(function(car) {
        var splitCar = car.split('/');
        garage.getCarMaintenance(callback, splitCar, car);
      });
      console.log('first');
    }).then(function() {
      console.log('second?');
      garage.removeCar();
    });
  };

  garage.removeCar = function() {
    var tempArray;
    console.log('third');
    $('#car').on('click', '.button', function(event) {
      tempArray = [];
      tempArray.push(event.target.name);
      console.log(tempArray);

      if ($(this)) {
        console.log($(this));
        console.log('removing now');
        $(this).remove();
        // $(this).parents('*[data-content="' + tempArray[0] + '"]');
      }
    });
  };

  garage.deleteFromDb = function(tempArray) {
    $.get('/removeCar');
  };

  module.garage = garage;
})(window);
