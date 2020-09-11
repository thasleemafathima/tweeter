
let composeavail = false;

const createTweetElement = function(tweetData) {
  const $tweet = $(`<article>
  <header class="headerr">
    <img src=${tweetData.user.avatars} alt="">
    <span>${tweetData.user.name}</span>
    <span>${tweetData.user.handle}</span>
  </header>
  <span class="im">${tweetData.content.text}</span>
  <hr style="height:5px;border-width:0px;background-color:black;max-width:1200px">
  <footer class="footerr">             
    <p class="left">1 days ago</p>
    <p class="right">&#9873;&#x1F504;&#x1F499;</p>
    
  </footer>
  <hr style="height:5px;border-width:0px;background-color:black;max-width:1200px">
</article`);
  return $tweet;
};

const compose = function() {
  if (composeavail) {
    //$('.new-tweet').html("");
    $('.new-tweet').css('visibility', 'hidden');
    composeavail = false;
  } else {
    //$('.new-tweet').html($comp);
    $('.new-tweet').css('visibility', 'visible');
    composeavail = true;
  }
};

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  let twt = "";
  for (let tweet in tweets) {
    twt = createTweetElement(tweets[tweet]);
    $('#contain').prepend(twt);
  }
};

$(document).ready(function() {
  let $data,$textarea;
  const $button = $('#button');
  $button.on('click', function(a) {
    a.preventDefault();
    console.log('Button clicked, performing ajax call...');
    $textarea = $(this).closest("form").find("textarea");
    $data = $textarea.serialize();
    if ($('#tweet-text').val() === null || $('#tweet-text').val() === "") {
      $("#error").text("Content Not Found");
    } else {
      $("#error").text("");
      $.post("/tweets/", $data)
        .done(function() {
          loadTweets($data);
        });
      $("#tweet-text").val('');
      const loadTweets = () => {
        $.getJSON("/tweets")
          .done(function(tweets) {
            renderTweets(tweets);
          });
      };
    }
  });
});

