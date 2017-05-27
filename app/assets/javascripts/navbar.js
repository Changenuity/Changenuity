$(function(){

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
