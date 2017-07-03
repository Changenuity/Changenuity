
// A Small Note - Shawn
// Originally, all of my JS was wrapped by a `$(function(...))`
// This is using jQuery to ensure that the JS is executed only
// once the page has been loaded.
// Unfortunately, with turbolinks, this ain't enough; we gotta
// use `$(document).on('turbolinks:load', function(...))`
$(document).on('turbolinks:load', function(){

  // Navbar toggling on desktop
  var navbarPermaOn = false;
  var toggleNavBar = (function() {
    var throttle = 50; // px
    return function() {
      if( scrollY > throttle && !navbarPermaOn ) {
        $('#navbar-wrapper').addClass('active');
      } else if( scrollY < throttle && !navbarPermaOn  ) {
        $('#navbar-wrapper').removeClass('active');
      }
      requestAnimationFrame(toggleNavBar);
    }
  })();
  requestAnimationFrame(toggleNavBar);

  $(document.body).on('mouseenter', '#navbar-brand', function(e) {
    $('#navbar-wrapper').addClass('active');
    navbarPermaOn = true;
  });

  $('#navbar-wrapper').on('mouseleave', function(e){
    var _this = $(this);
    var timeoutID = setTimeout(function() {
      _this.removeClass('active');
      navbarPermaOn = false;
    }, 350); // A delay of 0.35s is given as a leeway
    _this.data('fadeOutTimeOut', timeoutID);
  }).on('mouseenter', function(e) {
    clearTimeout($(this).data('fadeOutTimeOut'));
  });
  // END navbar toggling on desktop


  $(document.body).on('click', '.open-nav', function(e) {
    var $component = $('#' + $(e.target).attr('data-component-id'));
    var $overlay = $(createDisableOverlay($('#navbar'), medium_transition_time));
    var clearButton = document.createElement('i');
    clearButton.innerHTML = 'clear';
    clearButton.className = 'material-icons navbar-handle clear-nav';
    // clearButton.setAttribute('data-component-id', componentId);
    $component.append(clearButton);

    var removeFunction = function() {
      $overlay.fadeOut();
      $component.removeClass('active');
      setTimeout(function() {
        $overlay.remove();
        $(clearButton).remove();
      }, medium_transition_time);
    }

    $overlay.on('click', removeFunction);
    $(clearButton).on('click', removeFunction);
    $component.addClass('active');
  });

  var toggleNavbarForm = (function() {
    var formOn = false;
    var $form = $('#navbar-secondary .navbar-login-form');
    return function() {
      if( formOn ) {
        $form.fadeIn();
      } else {
        $form.fadeOut();
      }
      formOn = !formOn;
    };
  })();

  $(document.body).on('click', '#navbar-secondary button.form-toggle-show', function(e) {
    toggleNavbarForm();
  });

});
