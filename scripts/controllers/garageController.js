(function(module) {

  var garageController = {};

  garageController.init = function(ctx, next) {
    next();
  };

  module.garageController = garageController;
})(window);
