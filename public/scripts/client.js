
let composeavail = false;

const createTweetElement = function(tweetData) {
  let $dateCreated = new Date(tweetData.created_at);
  let $dateToday = new Date();

  let $timeDiff = Math.abs($dateToday.getTime() - $dateCreated.getTime());
  let $diffDays = Math.ceil($timeDiff / (1000 * 3600 * 24));

  const $tweet = $(`<article>
  <header class="headerr">
    <img src=${tweetData.user.avatars} alt="">
    <span>${tweetData.user.name}</span>
    <span>${tweetData.user.handle}</span>
  </header>
  <span class="im">${tweetData.content.text}</span>
  <hr style="height:5px;border-width:0px;background-color:black;max-width:1200px">
  <footer class="footerr">             
    <p class="left">${$diffDays} days ago</p>
    <p class="right">&#9873;&#x1F504;&#x1F499;</p>
    
  </footer>
  <hr style="height:5px;border-width:0px;background-color:black;max-width:1200px">
</article`);
  return $tweet;
};

const compose = function() {
  if (composeavail) {
    $('.new-tweet').css('visibility', 'hidden');
    composeavail = false;
  } else {
    $('.new-tweet').css('visibility', 'visible');
    composeavail = true;
  }
};

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  $('#contain').empty();
  for (let tweet in tweets) {
    const twt = createTweetElement(tweets[tweet]);
    $('#contain').prepend(twt);
  }
};

$(document).ready(function() {
  let $data,$textarea;
  const $button = $('#button');
  loadTweets($data);
  $button.on('click', function(e) {
    e.preventDefault();
    console.log('Button clicked, performing ajax call...');
    $textarea = $(this).closest("form").find("textarea");
    $data = $textarea.serialize();
    if ($('#tweet-text').val() === null || $('#tweet-text').val() === "") {
      $("#error").text("Content Not Found");
    } else if (document.getElementById('error').innerHTML === "Content is too long"){
      $("#error").text("Content is too long");
    } else {
      $("#error").text("");
      $.post("/tweets/", $data)
        .done(function() {
          $('#counter').text("140");
          loadTweets($data);
        });
      $("#tweet-text").val('');
      loadTweets($data);
    }
  });
});

const loadTweets = () => {
  $.getJSON("/tweets")
    .done(function(tweets) {
      renderTweets(tweets);
    });
};