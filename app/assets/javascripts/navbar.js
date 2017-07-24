
// A Small Note - Shawn
// Originally, all of my JS was wrapped by a `$(function(...))`
// This is using jQuery to ensure that the JS is executed only
// once the page has been loaded.
// Unfortunately, with turbolinks, this ain't enough; we gotta
// use `$(document).on('turbolinks:load', function(...))`
$(document).on('turbolinks:load', function(){

  ////////////////////////////////////////////////
  // BEGIN - Code related to the desktop navbar //
  ////////////////////////////////////////////////

  // The NavbarReceiver - Shawn
  // When I was working with the desktop navbar, I realized that I needed a
  // more versatille way of managing its fade in/out behaviours. Originally,
  // I had relied upon a basic system of setting an 'override' variable to
  // variables values and having the navbar act accordingly, but this soon
  // proved to be inadequate, confusing and hard to maintain.
  // Enter the NavbarReceiver class.
  // This class uses an Observer pattern in order to determine whether or
  // not the navbar should be shown.
  // The navbar is the subject, and all of the different things that affect
  // whether or not if the navbar should be shown are attached to it as
  // obvservers.
  var NavbarReceiver = (function(){

    function Remote(receiver, initiallyOn) {
      this.receiver = receiver || {};
      this.on = initiallyOn || false;
    }

    Remote.prototype.turnOn = function() {
      this.on = true;
      this.receiver.turnOn();
    }

    Remote.prototype.turnOff = function() {
      this.on = false;
      this.receiver.turnOff();
    }

    // Constructor
    function NavbarReceiver($navbar, turnOnFunction, turnOffFunction) {
      this.$navbar = $navbar;
      this.turnOnFunction = turnOnFunction || function() {};
      this.turnOffFunction = turnOffFunction || function() {};
      this.remotes = [];
    }

    NavbarReceiver.prototype.makeNewRemote = function() {
      var newRemote = new Remote(this);
      this.remotes.push(newRemote)
      return newRemote;
    }

    NavbarReceiver.prototype.turnOn = function() {
      this.turnOnFunction(this.$navbar);
    }

    NavbarReceiver.prototype.turnOff = function() {
      var atLeastOneOn = false;
      $.each(this.remotes, function(index, remote){
        if(remote.on) { // If any of the remotes wants the navbar on
          atLeastOneOn = true;
          return;
        }
      });
      // All remotes want the navbar off
      if( !atLeastOneOn ) {
        this.turnOffFunction(this.$navbar);
      }
    }

    return NavbarReceiver;
  })();

  var mainNavbar = new NavbarReceiver($('#navbar-wrapper')
                    ,function($navbar) {
                      $navbar.addClass('active');
                    }
                    ,function($navbar) {
                      $navbar.removeClass('active');
                    });

  var scrollRemote = mainNavbar.makeNewRemote();
  var hoverRemote = mainNavbar.makeNewRemote();
  var loginRemote = mainNavbar.makeNewRemote();

  // Scroll Remote logic
  var scrollToggle = (function(){
    var throttle = 50;
    return function() {
      if( scrollY > throttle ) {
        scrollRemote.turnOn();
      } else {
        scrollRemote.turnOff();
      }
      requestAnimationFrame(scrollToggle);
    }
  })();
  requestAnimationFrame(scrollToggle);

  // Hover Remote logic
  $('#navbar-wrapper')
    .on('mouseenter', function(){
      hoverRemote.turnOn();
      clearTimeout($(this).data('fadeOutTimeOut'));
    })
    .on('mouseleave', function(){
      var $this = $(this);
      var timeoutID = setTimeout(function() {
        hoverRemote.turnOff();
      }, 350);
      $this.data('fadeOutTimeOut', timeoutID);
    });

  // Login Remote logic
  var navbarFormOn = false;
  var $navbarForm = $('#navbar-secondary .navbar-login-form');
  var toggleNavbarForm = function() {
    if( !navbarFormOn ) {
      loginRemote.turnOn();
      $navbarForm.fadeIn();
      $('#nav-user-email').focus();
    } else {
      loginRemote.turnOff();
      $navbarForm.fadeOut();
    }
    navbarFormOn = !navbarFormOn;
  }
  $navbarForm.on('click', function(e){
    e.stopPropagation();
  });
  $(document.body).on('click', function(){
    loginRemote.turnOff();
    $navbarForm.fadeOut();
    navbarFormOn = false;
  });
  $('#navbar-secondary button.navbar-login-box').on('click', function(e) {
    e.stopPropagation();
    toggleNavbarForm();
  });

  //////////////////////////////////////////////
  // END - Code related to the desktop navbar //
  //////////////////////////////////////////////



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

});
