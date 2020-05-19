$(document).ready(function() {
  
//grab the text area value
//listen for key presses or changes
// grab the text value of output
//subtract the key press value form the output


// $("#tweet-text").change( function () {
//   console.log($(this).val());
// });

// $("#tweet-text").keypress( function () {
//   console.log($(this).val());
// });

// $("#tweet-text").keyup( function () {
//   console.log(this);
// });

 $("#tweet-text").on('keyup', function () {
  const $node = $(this);

  const nodeLength = $node.val().length;

  $node.next().find('.counter').text(function () {
    if (140 - nodeLength < 0) {
      $(this).css('color', 'red');
      return 140 - nodeLength;
    } else if (140 - nodeLength > 0){
      $(this).css('color', '#545149')
      return 140 - nodeLength
    }
  });
  

});







});