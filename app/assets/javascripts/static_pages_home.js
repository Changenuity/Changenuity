
$(document).on('turbolinks:load', function() {

  // Smooth Scrolling on internal links
  // Stolen from CSS-tricks' article on smooth scrolling
  // https://css-tricks.com/snippets/jquery/smooth-scrolling/
  $('#static-pages-home a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
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
          }, long_transition_time, function() {
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
        }
      }
    });

    $(document.body).on('click', '.flip-homepage', function(e){
      e.preventDefault();
      $('.header-wrapper > *').toggleClass('active');
      if( $(e.target).hasClass('go-to-sign-in') ) {
        document.getElementById('username').focus();
      } else if( $(e.target).hasClass('go-to-sign-up') ) {
        document.getElementById('user-email').focus();
      }
    });

});
