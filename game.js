gamePattern = [];
userClickedPattern = [];

var level = 0;

buttonColours = ["red","blue","green","yellow"];

function nextSequence(){

    userClickedPattern = [];

    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level " + level);
}


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
     $("#" + currentColor).addClass("pressed");

     setTimeout(function(){

        $("#" + currentColor).removeClass("pressed");
     }, 100);

}

$(document).keydown(function(){
    nextSequence();
});


function checkAnswer(curretLevel){

    if(userClickedPattern[curretLevel] === gamePattern[curretLevel]){

        // console.log("success");

        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{

        var wAudio = new Audio("sounds/wrong.mp3");
        wAudio.play();
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
       
}

function startOver(){

    level = 0;
    gamePattern = [];

}
