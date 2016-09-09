(function(module) {
  var calendarController = {};

  calendarController.init = function(ctx, next) {
    next();
  };

  module.calendarController = calendarController;
})(window);
