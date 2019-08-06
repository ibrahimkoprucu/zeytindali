$('a[role=tab]').on("click", function (event) {

  var hash = this.hash;
  var target = $(hash);

  if (target.length) {
    event.preventDefault();

    var tab = document.getElementById(target.attr("id"));

    window.location.hash = hash;
    tab.scrollIntoView();
  }

});