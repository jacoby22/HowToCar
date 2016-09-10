(function(module) {
  var resourceView = {};

  resourceView.show = function() {
    $('.tab-content').hide();
    $('#button-container').hide();
    $('#addToCalendar').hide();
    $('#search').hide();
    $('#resource').show();
    $('#loginButton').hide();
  };

  module.resourceView = resourceView;

})(window);
