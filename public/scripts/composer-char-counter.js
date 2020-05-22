$(document).ready(function() {
  
  $("#tweet-text").on('keyup', function () {
    const $node = $(this);

    const nodeLength = $node.val().length;

    $node.next().find('.counter').text(function () {
      if (140 - nodeLength < 0) {
        $(this).addClass('red');
        return 140 - nodeLength;
      } else if (140 - nodeLength > 0){
        $(this).removeClass('red');
        return 140 - nodeLength;
      }
    });
  });
});