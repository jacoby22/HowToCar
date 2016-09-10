(function(module) {
  var resourceController = {};

  resourceController.init = function(ctx, next) {
    next();
  };

  module.resourceController = resourceController;
})(window);
