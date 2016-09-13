(function(module) {
  var loginController = {};

  loginController.init = function(ctx, next) {
    $('.main-nav').hide();
    // $('.heading-group-h1 p').hide();

    next();
  };

  module.loginController = loginController;
})(window);
