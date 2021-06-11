// Question array
var questions = [
    {
        question: "Commonly Used data types DO NOT include:",
        options: ["stings", "alerts", "booleans", "numbers"],
        correct: "alerts"
    },
    {
        question: "The condition in an if / else statment is enclosed within ________:",
        options: ["quotes", "curly brackets", "parentheses", "square brackets"],
        correct: "parentheses"
    },
    {
        question: "Arrays in JavaScript can be used to store ________:",
        options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correct: "all of the above"
    },
    {
        question: "String values must be enclosed within ________ when being assigned to variables.",
        options: ["commas", "curly brackets", "quotes", "parentheses"],
        correct: "quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        correct: "console.log"
    }
]

var timer;

document.getElementById("main").innerHTML = "<h1>Code Quiz Challenge</h1><p>Try to answer the following code related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!</p><button id='startButton'>Start</button>";

var start = document.querySelector("#startButton");
start.addEventListener("click", function() {
    countdownTimer();
});
      
function countdownTimer() {
    timer = 5;
    var countdown = setInterval(function() {

        if (timer <= 0) {
            clearInterval(countdown);
            document.getElementById("clock").innerHTML = "Time has expired!";
        } else {
            console.log(timer);
            document.getElementById("clock").innerHTML = "Time: " + timer;
            timer -= 1;
        }
    }, 1000);
}

