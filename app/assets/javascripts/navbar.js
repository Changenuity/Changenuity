/**
 *  Creates a disabling overlay.
 *  @param {jQuery} parentElement
 *  The parent element which the disabling overlay will be appended onto as a
 *  direct child. Note that the disabling overlay will be appened on as the
 *  FIRST child of the parent element.
 *  @param {Number} transitionTime
 *  The time it will take for the overlay to fade in. If none is specified,
 *  uses the jQuery standard.
 *  @param {Number} zIndex
 *  The zIndex value of the new overlay. If none is specified, nothing will be
 *  given. NOTE: Since the disabling-overlay is always appeneded on as the
 *  first child, this means that if the zIndex is not provided, it will simply
 *  cover up all elements lower than the parent element.
 **/
function createDisableOverlay(parentElement, transitionTime, zIndex) {
  // parentElement is a jQuery
  var overlay = $(document.createElement('div'));
  overlay.addClass('disabling-overlay');
  if( zIndex )
    overlay.css('z-index', zIndex);
  parentElement.prepend(overlay);
  overlay.fadeIn(transitionTime);
}

$(function(){
  // Bindings
  $(document.body).on('click', '#navbar .disabling-overlay', function(e) {
    $(e.target).fadeOut(); // jQuery cause I'm too retarded apparently
    $('#navbar-primary').removeClass('active');
    setTimeout(function() {
      $(e.target).remove();
    }, 400); // TODO: Remove this magic number
  });
  $(document.body).on('click', '.navbar-handle', function() {
    createDisableOverlay($('#navbar'));
    $('#navbar-primary').addClass('active');
  })
});
