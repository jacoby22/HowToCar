(function(module) {
  var loginController = {};

  loginController.init = function(ctx, next) {
    $('.main-nav ul').hide();

    next();
  };

  module.loginController = loginController;
})(window);
