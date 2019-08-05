$('a[role=tab]').on("click", function (event) {

  var hash = this.hash;

  // Figure out element to scroll to
  var target = $(hash);
  target = target.length ? target : $('[name=' + hash.slice(1) + ']');
  // Does a scroll target exist?
  if (target.length) {
    // Only prevent default if animation is actually gonna happen
    event.preventDefault();
    $('html, body').animate({
      scrollTop: target.offset().top
    }, 700, function () {

      document.getElementById(target.attr("id")).scrollIntoView();
      window.location.hash = hash;

      var $target = $(target);
      $target.focus();
      if ($target.is(":focus")) { // Checking if the target was focused
        return false;
      } else {
        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
        $target.focus(); // Set focus again
      }
    });
  }

});