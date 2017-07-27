
$(document).on('turbolinks:load', function() {


    $(document.body).on('click', '.flip-homepage', function(e){
      e.preventDefault();
      $('.header-wrapper > *').toggleClass('active');
      if( $(e.target).hasClass('go-to-sign-in') ) {
        $('#username').focus();
      } else if( $(e.target).hasClass('go-to-sign-up') ) {
        $('#user-email').focus();
      }
    });

});
