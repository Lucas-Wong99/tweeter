/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
  let results = '';
  for (const tweet of data) {
    results += createTweetElement(tweet);
  }
  return $('#tweets-container').append(results);
}

const createTweetElement = function (data) {
  const $tweet = `
      <article>
        <header>
          <div>
            <img src="${data.user.avatars}" class="user-icon">
            <h4>${data.user.name}</h4>
          </div>
          <p class="tweet-tag">${data.user.handle}</p>
        </header>
        <h4 class="tweet-content"> 
          ${data.content.text} 
        </h4>
        <footer>
          <p>${data.created_at}</p>
          <p>icons</p>
        </footer>
      </article>
  `;
  return $tweet;
}

renderTweets(data);