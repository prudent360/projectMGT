$("#project").click(function (event) {
  $(this)
    .parent()
    .fadeOut(500, function () {
      $(this).remove();
    });
    event.stopPropagation();
});
