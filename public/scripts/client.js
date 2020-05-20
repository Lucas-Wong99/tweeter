/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function (){

  const loadTweets = function() {
    $.getJSON("/tweets")
    .then(function(tweets) {
      $("#tweets-container").empty();
      renderTweets(tweets);
    });
  }

  loadTweets();

  $("form").submit(function(event) {
    event.preventDefault();
    const textBoxVal = $(this).find("#tweet-text").val();
    if (textBoxVal === "") {
      alert("This tweet has no content!");
    } else if (textBoxVal.length > 140) {
      alert("The length of your tweets must be less than 140 characters")
    } else {
      const data = $(this).serialize();
      $.post("/tweets", data, function(res, status) {
        console.log(status)
        loadTweets();
      });
    }
  });
  
});

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


const renderTweets = function (data) {
  for (const tweet of data) {
    $("#tweets-container").prepend(createTweetElement(tweet));
  }
};

const createTweetElement = function ({user: {avatars, name, handle}, content: {text: contentText}, created_at}) {
  const milliSecsInDay = 86400000;
  const $tweet = `
      <article>
        <header>
          <div>
            <img src="${avatars}" class="user-icon">
            <h4>${name}</h4>
          </div>
          <p class="tweet-tag">${handle}</p>
        </header>
        <h4 class="tweet-content"> 
          ${escape(contentText)} 
        </h4>
        <footer>
          <p>${Math.floor((Date.now() / milliSecsInDay) - (created_at / milliSecsInDay))} days ago</p>
          <p>icons</p>
        </footer>
      </article>
  `;
  return $tweet;
};

