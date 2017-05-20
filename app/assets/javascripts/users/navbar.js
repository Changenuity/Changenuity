$(function() {

  // BINDINGS
  $.each($('.navbar-primary-link'), function() {
    this.addEventListener('mouseover', function() {
      $(this).addClass('active');
    });
    this.addEventListener('mouseout', function() {
      $(this).removeClass('active');
    });
  });
});
