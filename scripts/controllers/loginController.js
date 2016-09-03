(function(module) {
  var loginController = {};

  loginController.init = function(ctx, next) {
    next();
  };

  module.loginController = loginController;
})(window);
