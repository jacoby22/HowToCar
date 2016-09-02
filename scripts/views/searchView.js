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
