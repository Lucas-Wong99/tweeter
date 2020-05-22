const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function({
  user: {avatars, name, handle},
  content: {text: contentText},
  created_at
}) {
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
          <p>${moment(created_at).fromNow()}</p>
          <div class="icons">
            <i class="fas fa-flag" fa-2x></i>
            <i class="fas fa-retweet" fa-2x></i>
            <i class="fas fa-heart" fa-2x></i>
          </div>
        </footer>
      </article>
  `;
  return $tweet;
};

const renderTweets = function(data) {
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
  const textBoxVal = $(this).find("#tweet-text");
  if (textBoxVal.val() === "") {
    $('.error-container').slideDown().children().text("🛑Error: Your tweet had no content! Try again.🛑");
  } else if (textBoxVal.val().length > 140) {
    $('.error-container').slideDown().children().text("🛑Error: The length of your tweets must be less than 140 characters! Try again🛑");
  } else {
    const data = $(this).serialize();
    $('.error-container').slideUp();
    $.post("/tweets", data, function(res, status) {
      loadTweets();
    });
    textBoxVal.val('');
    $('output').text(140);
  }
};

const scrollHandler = function() {
  const pixel = $(this).scrollTop();
  if (pixel > 350) {
    $("#scroll-button").show();
    $(".compose").hide();
  } else {
    $("#scroll-button").hide();
    $(".compose").show();
  }
};

const handleComposeClickEvent = function() {
  $(".new-tweet").slideToggle(500);  
  $("#tweet-text").focus();
};

const handleScrollButtonClickEvent = function() {
  $(window).scrollTop(0);
  $(".new-tweet").slideDown(500);  
  $("#tweet-text").focus();
};