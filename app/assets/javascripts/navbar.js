var showNavBar = function() {
  $('#navbar-wrapper').addClass('active');
  $('#navbar-brand').addClass('active');
  $('#navbar-primary')
      .css("display", "flex")
      .animate({
        opacity: 1
      }, medium_transition_time);
  $('#navbar-secondary')
      .css("display", "flex")
      .animate({
        opacity: 1
      }, medium_transition_time);
}
var hideNavBar = function() {
  $('#navbar-wrapper').removeClass('active');
  $('#navbar-brand').removeClass('active');
    $('#navbar-primary')
        .animate({
          opacity: 0
        }, medium_transition_time)
        .css("display", "none");
    $('#navbar-secondary')
        .animate({
          opacity: 0
        }, medium_transition_time)
        .css("display", "none");
}


$(function(){
  var toggleNavBar = (function() {
    var showNavBar = function() {
      $('#navbar-wrapper').addClass('active');
      $('#navbar-brand').addClass('active');
      $('#navbar-primary')
          .css("display", "flex")
          .animate({
            opacity: 1
          }, medium_transition_time);
      $('#navbar-secondary')
          .css("display", "flex")
          .animate({
            opacity: 1
          }, medium_transition_time);
    }
    var hideNavBar = function() {
      $('#navbar-wrapper').removeClass('active');
      $('#navbar-brand').removeClass('active');
        $('#navbar-primary')
            .animate({
              opacity: 0
            }, medium_transition_time)
            .css("display", "none");
        $('#navbar-secondary')
            .animate({
              opacity: 0
            }, medium_transition_time)
            .css("display", "none");
    }
    var throttle = 50; // px
    var navbarOn = false;
    return function() {
      if( scrollY > throttle && !navbarOn ) {
        showNavBar();
        navbarOn = true;
      } else if( scrollY < throttle && navbarOn ) {
        hideNavBar();
        navbarOn = false;
      }
      requestAnimationFrame(toggleNavBar);
    }
  })();
  requestAnimationFrame(toggleNavBar);
  // var toggleNavBar = (function() {
  //   var navbarWrapper = $('#navbar-wrapper');
  //   var firstKnownY = scrollY;
  //   var throttle = 50; // px
  //   return function() {
  //     var currentY = scrollY;
  //     if( Math.abs(currentY-firstKnownY) > throttle ) {
  //       if( !navbarWrapper.hasClass('active') ) {
  //         navbarWrapper.addClass('active');
  //       }
  //     } else {
  //       requestAnimationFrame(toggleNavBar);
  //     }
  //   }
  // })();
  // requestAnimationFrame(toggleNavBar);
  /*
  var toggleNavBar = (function(){
    var navbarWrapper = $('#navbar-wrapper');
    var lastKnownY = scrollY;
    var throttle = 50; //px
    return function() {
      var currentY = scrollY;
      if( currentY > lastKnownY+throttle ) {
        if( navbarWrapper.hasClass('active') ) {
          navbarWrapper.removeClass('active');
        }
        lastKnownY = currentY;
      } else if( currentY < lastKnownY-throttle ) {
        if( !navbarWrapper.hasClass('active') ) {
          navbarWrapper.addClass('active');
        }
        lastKnownY = currentY;
      }
      requestAnimationFrame(toggleNavBar);
    };
  })();

  requestAnimationFrame(toggleNavBar);
  */

  // Bindings
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
  })


});
