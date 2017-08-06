// This file contains global defintions for variables and functions used
// throughout the application.

// CONSTANT DEFINITIONS
var quick_transition_time = 200;
var medium_transition_time = 400;
var long_transition_time = 1000;

var snackbar_time = 4000;

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

/** Timer Class
 *  Courtesy of: https://stackoverflow.com/questions/3969475/javascript-pause-settimeout
 *  A wrapper for setTimeout that provides pause and resume capabilities.
 *  Timer starts as soon as the object is created.
 *
 *  In addition to pausing the timer, the pause method also returns in
 *  miliseconds the amount of time remaining.
 **/
function Timer(callback, delay) {
  var timerId
    , start
    , remaining = delay;

  this.pause = function() {
    window.clearTimeout(timerId);
    remaining -= (new Date() - start);
    return remaining;
  }

  this.play = function() {
    start = new Date();
    window.clearTimeout(timerId);
    timerId = setTimeout(callback, remaining);
  }

  this.play();
}

function Snackbar(element) {
  this.element = element;
  this.progressBar = new ProgressBar.Line(element, {
    strokeWidth: 0.5,
    color: '#EC6333',
    duration: snackbar_time,
    easing: 'linear'
  });
}

// Fade in the element and then start the count down
Snackbar.prototype.startShow = function() {
  var _this = this;
  $(_this.element).show().addClass('add');
  // No need to keep track of this timerId, let it run
  setTimeout(function() {
    $(_this.element).removeClass('add'); // Must remove the add class so the animation associated with the remove class may run
    _this.progressBar.animate(1); // Begin progress bar animation
    _this.removeTimer = new Timer(function(){
      _this.remove();
    }, snackbar_time);
  }, 1000); // After a second, start the countdown
  return _this;
}

Snackbar.prototype.pause = function() {
  this.progressBar.stop();
  this.remainingTime = this.removeTimer.pause();
  return this;
}

Snackbar.prototype.resume = function() {
  this.progressBar.animate(1, {duration: this.remainingTime});
  this.removeTimer.play();
  return this;
}

Snackbar.prototype.remove = function() {
  var $element = $(this.element);
  $element.addClass('remove');
  setTimeout(function(){
    $element.remove();
  }, 400);
  return this;
}




/*
function SnackbarController(alerts) {
  var _this = this;
  _this.alerts_array = [];
  $(alerts).each(function(index, alert) {
    _this.alerts_array.push(alert);
  });
}

SnackbarController.prototype.showAlerts = function() {
  $.each(this.alerts_array, function(index, alert) {
    $(alert).show().addClass('add');
    setTimeout(function(){
      $(alert).removeClass('add');
    }, 1000);
  });
}

SnackbarController.prototype.removeAlerts = function() {
  $.each(this.alerts_array, function(index, alert){
    $(alert).addClass('remove');
    setTimeout(function() {
      $(alert).remove();
    }, 400);
  })
}
*/

// Global bindings and behaviours
$(document).on('turbolinks:load', function(){


  // Store the latest scrollY and scrollX values for
  // debouncing scroll events
  $(window).on('scroll', function(){
    scrollY = window.scrollY;
    scrollX = window.scrollX;
  }, false);


  // Smooth Scrolling on internal links
  // Stolen from CSS-tricks' article on smooth scrolling
  // https://css-tricks.com/snippets/jquery/smooth-scrolling/
  $(document.body).on('click', 'a[href*="#"]', function(){
    if($(this).is('[href="#"], [href="#0"], [role="button"]')) {
      // Remove links that don't actually link to anything and
      // links which are intended as buttons
      return;
    }
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, medium_transition_time, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      } else if( this.hash === '#top' ) {
        // Special case for scroll to top
        event.preventDefault();
        $('html, body').animate({
          scrollTop: 0
        }, medium_transition_time, function() {
          // Reset focus by arbitrarily selecting something
          // to focus and then blur out
          $(target).focus().blur();
        });
      }
    }
  });

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

  var alerts = [];
  $('.snackbar-container .alert').each(function(){
    alerts.push((new Snackbar(this)).startShow());
  });
  //
  // $(document.body).on('mouseenter', '.snackbar-container', function(){
  //   $.each(alerts, function() {
  //     this.pause();
  //   });
  // });

  $('.snackbar-container').on('mouseenter', function(){
    $.each(alerts, function() {
      this.pause();
    });
  }).on('mouseleave', function() {
    $.each(alerts, function() {
      this.resume();
    });
  });
  /*
  // Snackbar behaviour
  snackbar = new SnackbarController($('.snackbar-container .alert'));
  snackbar.showAlerts();
  setTimeout(function(){
    snackbar.removeAlerts();
  }, 3000);
  */
});
