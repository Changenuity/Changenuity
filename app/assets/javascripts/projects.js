// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

// Sets up all bindings related to the Projects views

$(function() {
  // CONTENT

  // STYLING


  // Disabling event propagation when certain elements are clicked
  $.each($('a, .fav-count, .btn-fav'), function() {
    this.addEventListener('click', function(event) {
      event.stopPropagation();
    })
  });


  // Pseudo-effect of increasing number of favourites
  $.each($('.btn-fav'), function() {
    $(this).on('click', function(event) {
      if( $(this).hasClass('active') ) {
        $(this).siblings('.fav-count').html(function(){
          return parseInt($(this).html()) - 1;
        });
      } else {
        $(this).siblings('.fav-count').html(function(){
          return parseInt($(this).html()) + 1;
        });
      }
      $(this).toggleClass('active');
    })
  });


  // BINDINGS

  // Adds bindings for when user clicks on a pcard (aka Project cards)
  $.each($('.pcard'), function() {
    this.addEventListener('click', function(event) {
      window.location.href = $(this).attr('data-project-url');
    }, false);
  });
});
