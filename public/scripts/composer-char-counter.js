const charactersRemaining = function() {
  let remaining = 140 - $('#tweet-text').val().length;
  $('#counter').text(remaining);
  if (remaining < 0) {
    $('#counter').css('color','red');
    $("#error").text("Content is too long");
  } else {
    $('#counter').css('color','black');
    $("#error").text("");
  }
};

$(document).ready(function() {
  console.log("ready");
  $('#tweet-text').keyup(function() {
    charactersRemaining();
  });
});
