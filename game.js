var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(".btn").click(function () {
  //creates a variable in which the id of the button which we clicked is stored
  var userChosenColour = $(this).attr("id");
  // The button that is stored inside userChosenColor is pushed into userClickedPattern array
  userClickedPattern.push(userChosenColour);

  CheckAnswer(userClickedPattern.length - 1);

  // UI/UX of the button
  playSound(userChosenColour);
  animatePress(userChosenColour);
});

// Gives the next sequence for winning condition
function nextSequence() {
  
  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  //random color pattern are created for gam winning condition
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

function CheckAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong");
  }
}
