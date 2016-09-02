$('.icon-menu').on('click',function() {
  $('.main-nav ul').toggle('slow');

});
$(window).on('resize', function() {
  if ($(window).width() >= 680) {
    $('.main-nav ul').show();
  } else {
    $('.main-nav ul').hide();
    $('.icon-menu').show();
  }
});
// $('.main-nav').on('click', '.tab', function(e) {
//   $('.tab-content').hide();
//   $('#' + $(this).data('content')).fadeIn();
// });
//
// $('.main-nav .tab:first').click(); // Let's now trigger a click on the first .tab element, to set up the page.
