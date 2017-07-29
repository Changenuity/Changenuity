
$(document).on('turbolinks:load', function() {


    $(document.body).on('click', '.flip-homepage', function(){
      $('.header-wrapper > *').toggleClass('active');
      if( $(this).hasClass('go-to-sign-in') ) {
        $('#user_email').focus();
      }
    });


});
