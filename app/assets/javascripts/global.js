// This file contains global defintions for variables and functions used
// throughout the application.

// CONSTANT DEFINITIONS
var quick_transition_time = 200;
var medium_transition_time = 400;
var long_transition_time = 1000;

var DESKTOP_NAVBAR_SOLID_THRESHOLD = 50; // px


// GLOBAL VARIABLES
var scrollY;
var scrollX;

/**
 *  Creates a disabling overlay.
 *  @param {jQuery} $parentElement
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
 *  @return {Element}
 *  Returns the overlay as a DOM Element
 **/
function createDisableOverlay($parentElement, transitionTime, zIndex) {
  // parentElement is a jQuery
  var overlay = $(document.createElement('div'));
  overlay.addClass('disabling-overlay');
  if( zIndex )
    overlay.css('z-index', zIndex);
  $parentElement.prepend(overlay);
  overlay.fadeIn(transitionTime);
  return overlay;
}


// Global bindings and behaviours
$(document).on('turbolinks:load', function(){


  $(window).on('scroll', function(){
    scrollY = window.scrollY;
    scrollX = window.scrollX;
  }, false);


  // Replace all images with the svg class with inline-svg
  // Code courtesy of Drew Baker: https://stackoverflow.com/a/11978996
  $('img.svg').each(function(){
      var $img = jQuery(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');

      $.get(imgURL, function(data) {
          // Get the SVG tag, ignore the rest
          var $svg = $(data).find('svg');

          // Add replaced image's ID to the new SVG
          if(typeof imgID !== 'undefined') {
              $svg = $svg.attr('id', imgID);
          }
          // Add replaced image's classes to the new SVG
          if(typeof imgClass !== 'undefined') {
              $svg = $svg.attr('class', imgClass+' replaced-svg');
          }

          // Remove any invalid XML tags as per http://validator.w3.org
          $svg = $svg.removeAttr('xmlns:a');

          // Replace image with new SVG
          $img.replaceWith($svg);

      }, 'xml');
    });

});
