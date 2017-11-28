// This file contains global defintions for variables and functions used
// throughout the application.

// CONSTANT DEFINITIONS
var QUICK_TRANSITION_TIME = 200;
var MEDIUM_TRANSITION_TIME = 400;
var LONG_TRANSITION_TIME = 1000;

var SNACKBAR_TIME = 4000;

var NULL_FUNCTION = function(){};

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

/**
 *  Timer Class
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




function Snackbar(element, duration) {
  this.element = element;
  this.duration = duration;

  var _this = this;
  // Set up bindings for click removing
  $(this.element).on('click', function() {
    _this.remove();
  });
}

// Fade in the element and then start the count down
Snackbar.prototype.startShow = function() {
  TweenLite.from(this.element, 1, {
    y: "50px",
    opacity: 0,
    onComplete: function() {
      console.log(this);
      $(this.element).css('background-image', 'rgba(0,0,0,0.5)')
      this.progress = TweenLite.fromTo(this.element, this.duration, {
        backgroundImage: "linear-gradient(to right,rgba(255,255,255,0.1),rgba(255,255,255,0.5))",
        backgroundRepeat: "no-repeat",
        backgroundSize: "0% 100%"
      }, {
        backgroundSize: "100% 100%",
        ease: Power0.easeNone,
        onComplete: function() {
          this.remove();
        },
        onCompleteScope: this
      });
    },
    onCompleteScope: this
  });
  return this;
}

Snackbar.prototype.pause = function() {
  this.progress.pause();
  return this;
}

Snackbar.prototype.resume = function() {
  this.progress.resume();
  return this;
}

Snackbar.prototype.remove = function() {
  TweenLite.to($(this.element), 0.4, {
      y: "50px",
      opacity: 0,
      onComplete: function() {
        TweenLite.to($(this), 0.2, {
          height: 0,
          margin: 0,
          padding: 0,
          borderWidth: 0,
          onComplete: function() {
            $(this).remove();
          },
          onCompleteScope: this
        });
      },
      onCompleteScope: this.element
  });
}


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
        }, MEDIUM_TRANSITION_TIME, function() {
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
        }, MEDIUM_TRANSITION_TIME, function() {
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
  $('.snackbar-container .snackbar').each(function() {
    alerts.push((new Snackbar(this, 5)).startShow());
  });

  $(document.body)
    .on('mouseenter', '.snackbar-container', function(){
      // console.log("Entry registered!");
      $.each(alerts, function() {
        this.pause();
      });
    })
    .on('mouseleave', '.snackbar-container', function(){
      // console.log("Leave registered!");
      $.each(alerts, function() {
        this.resume();
      });
    });
});
