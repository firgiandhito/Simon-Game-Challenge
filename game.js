const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 1;
let started = false;

const wrongSound = new Audio("sounds/wrong.mp3");

// Function to initialize the game
function initializeGame() {
    $(".btn").attr("disabled", true); // Disable buttons on page load
    $(document).keypress(startGame);
    $("body").click(startGame);
}

// Function to start the game
function startGame() {
    if (!started) {
        $(".btn").attr("disabled", false).on("click", handleButtonClick); // Enable buttons
        started = true;
        setTimeout(function () {
            nextSequence();
        }, 100); // Start the game with a delay
    }
}

// Function to generate the next sequence in the game
function nextSequence() {
    setTimeout(() => {
        const randomChosenColor = buttonColors[Math.floor(Math.random() * buttonColors.length)];
        gamePattern.push(randomChosenColor);

        $("#" + randomChosenColor).animate({ opacity: 0 }, 100).animate({ opacity: 1 }, 100);
        playSound(randomChosenColor);
        $("#level-title").text("Level " + level);
        showScore(level - 1);
        level++;
    }, 1000);
}

// Function to check the user's answer against the game pattern
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (currentLevel === gamePattern.length - 1) {
            userClickedPattern = [];
            setTimeout(nextSequence, 50); // Move to the next sequence after a delay
        }
    } else {
        startOver(); // If the answer is wrong, reset the game
    }
}

// Function to handle button clicks
function handleButtonClick(e) {
    const userChosenColor = e.target.id;
    animatePress(userChosenColor);
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
}

// Function to play sound for the given color
function playSound(name) {
    const audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Function to animate button press
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => $("#" + currentColor).removeClass("pressed"), 100);
}

// Function to reset the game state
function startOver() {
    wrongSound.play();
    $("body").addClass("game-over");

    setTimeout(() => {
        $("body").removeClass("game-over");
        $("#level-title").text("Game Over, Press to Restart");
        resetGame();
    }, 200);
}

// Function to show final score
function showScore (score) {
    if (score % 5 == 0 && score >= 5) {
        $("#score").text("Keep it Up! 🔥🔥🔥");
        setTimeout(function () {
            $("#score").text("Your Score: " + (score * 10));
        }, 1500);
    } else {
        $("#score").text("Your Score: " + (score * 10));
    }
}

// Function to reset game variables
function resetGame() {
    $(".btn").attr("disabled", true).off("click");
    level = 1;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}

// Initialize the game when the document is ready
$(document).ready(initializeGame);