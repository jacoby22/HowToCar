(function(module) {
  var calendarView = {};

  calendarView.show = function() {
    $('.tab-content').hide();
    $('#addToCalendar').hide();
    $('#calendar').show();
  };

  module.calendarView = calendarView;

})(window);
