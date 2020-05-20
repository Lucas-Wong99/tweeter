/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function (){
  renderTweets(data);

  $('form').submit(function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    $.post("/tweets", data)
    .then(function(res) {
      console.log('Success', res);
    });
  });
});

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088   
  }
]

const renderTweets = function (data) {
  for (const tweet of data) {
    $('#tweets-container').prepend(createTweetElement(tweet));
  }
}

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
          ${contentText} 
        </h4>
        <footer>
          <p>${Math.floor((Date.now() / milliSecsInDay) - (created_at / milliSecsInDay))} days ago</p>
          <p>icons</p>
        </footer>
      </article>
  `;
  return $tweet;
}

