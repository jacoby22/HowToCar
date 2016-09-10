(function(module) {
  var resourceView = {};

  resourceView.show = function() {
    $('.tab-content').hide();
    $('#addToCalendar').hide();
    $('#resource').show();
  };

  module.resourceView = resourceView;

})(window);
