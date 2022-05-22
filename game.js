var buttonColors = ["red", "blue","green", "yellow"];
var gamePattern =[];
var userPattern =[];
var started = false;
var level = 0;


$(document).on("keydown touchstart", function(){
    if(!started){
        $("#level-title").text("level "+ level)
        nextSequence();
        started = true;
    } 
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userPattern.push(userChosenColor);
    var clickSound = new Audio("sounds/" + userChosenColor + ".mp3");
    clickSound.play();
    animatePress(userChosenColor);
    checkClick(userPattern.length - 1);
});



function nextSequence(){
    userPattern = [];
    level = level + 1;
    $("#level-title").html("level "+ level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    var sequenceSound = new Audio("sounds/" + randomChosenColor + ".mp3");
    sequenceSound.play();
};

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){$("#" + currentColour).removeClass("pressed");}, 100)
};

function checkClick(currentLevel){
    if(userPattern[currentLevel] == gamePattern[currentLevel] ){
        if(userPattern.length == gamePattern.length)
            setTimeout(function(){nextSequence()}, 1000);
    }else{
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
          gameOver();
    }
}

function gameOver(){
    level = 0;
    gamePattern = [];
    started = false;

}