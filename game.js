gamePattern = [];
userClickedPattern =[];
buttonColors = ["red", "blue", "green", "yellow"];


var level = 0;
var started = false;

// Detecting keypress for game to start
$(document).keydown(function(){

  if(!started)
  {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// user clicked buttons
$(".btn").click(function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    // playing sound of the userchosen color.
    playSound(userChosenColor);
    animatePressed(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});
// checking user's answer.

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
      console.log("success");
      if(userClickedPattern.length === gamePattern.length)
      {
        setTimeout(function(){
          nextSequence();
        },1000);
      }
    }
    else{
      var str = "wrong";
      playSound(str);
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },500);
      $("h1").text("Game Over, Press Any Key to Restart 😐");
      startOver();
    }
}

function nextSequence(){
  // changing level title
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  randomNumber = Math.floor(Math.random()*4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  // Animate
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  // playing sound
  playSound(randomChosenColor);
}

//sound function
function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
// animating pressed button
function animatePressed(currentColor){
$("."+currentColor).addClass("pressed");
setTimeout(function() {
  $("."+currentColor).removeClass("pressed");
}, 100);
}
// Restarting the game
function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}
