/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function (){

  loadTweets();

  $("form").submit(handleFormSubmission);
  
  $(".compose").click(function () {
    $(".new-tweet").slideToggle();  
  });

  $("window").on("scroll", function() {
    $("#scroll-button").show()
  });
});