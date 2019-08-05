$('a[role=tab]').on("click", function (event) {

  var hash = this.hash;
  var target = $(hash);

  if (target.length) {
    event.preventDefault();

    $('html body').animate({ scrollTop: target.offset().top }, 500, function () {
      window.location.hash = hash;
      document.getElementById(target.attr("id")).scrollIntoView();
    });
  }

});