var buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
level = 0;
started = false;

function nextSequence () {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).animate({opacity: 0}, 100).animate({opacity: 1}, 100);
    playSound(randomChosenColor);
    $("#level-title").text("Level " + level);
    level++;
}

function startOver () {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
    }, 200);

    level = 0;
    gamePattern = [];
    userClickedPattern = []
    started = false;
}

function checkAnswer (currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (currentLevel === gamePattern.length - 1) {
            userClickedPattern = []
            setTimeout(nextSequence, 1000);
        }
    } else {
        startOver();
    }
}

function playSound (name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress (currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

$(document).keypress(function (e) {
    if (e.key && !started) {
        started = true;
        setTimeout(nextSequence, 100);
    }
});

$(".btn").on("click", function (e) {
    var userChosenColor = e.target.id;
    animatePress(userChosenColor);
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});