// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

// Sets up all bindings related to the Projects views

$(function() {
  // CONTENT

  // STYLING


  // BINDINGS
  // Adds bindings for when user clicks on a pcard (aka Project cards)
  $.each($('.pcard'), function(index, pcard) {
    pcard.addEventListener('click', function(event) {
      if( $(event.target).hasClass('btn-fav') ) {
        event.stopPropagation(); // Prevents redirection to project's page
        alert('You hav just favorited a project!');
      } else if( event.target.tagName === 'A' ) {
        event.stopPropagation(); // Prevents redirection to project's page
      } else {
        window.location.href = $(this).attr('data-project-url');
      }
    }, false);
  });
  // Bindings for when user clicks on the heart

});
