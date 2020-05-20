const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function ({
  user: {avatars, name, handle},
  content: {text: contentText},
  created_at
}) {
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

const renderTweets = function (data) {
  for (const tweet of data) {
    $("#tweets-container").prepend(createTweetElement(tweet));
  }
};

const loadTweets = function() {
  $.getJSON("/tweets")
  .then(function(tweets) {
    $("#tweets-container").empty();
    renderTweets(tweets);
  });
};

const handleFormSubmission = function(event) {
  event.preventDefault();
  const textBoxVal = $(this).find("#tweet-text").val();
  if (textBoxVal === "") {
    $('.error-container').slideDown().children().text("🛑Error: Your tweet had no content! Try again.🛑");
  } else if (textBoxVal.length > 140) {
    $('.error-container').slideDown().children().text("🛑Error: The length of your tweets must be less than 140 characters! Try again🛑");
  } else {
    const data = $(this).serialize();
    $('.error-container').slideUp();
    $.post("/tweets", data, function(res, status) {
      console.log(status)
      loadTweets();
    });
  }
};