(function(module) {
  var resourceView = {};

  resourceView.show = function() {
    $('.tab-content').hide();
    $('#push-to-garage').hide();
    $('#addToCalendar').hide();
    $('#search').hide();
    $('#resource').show();
    $('#loginButton').hide();
    $('#searchGarage').hide();
    $('button#push-to-garage').hide();
  };

  module.resourceView = resourceView;

})(window);
