(function(module) {

  var garageController = {};

  garageController.init = function(ctx, next, callback) {
    garage.showCar(callback);   //  TODO :THIS CALL ADDS ADDNL DATA EVERYTIME Garage Link is clicked.
    next();
  };

  module.garageController = garageController;
})(window);
