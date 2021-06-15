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

var start = document.querySelector("#startButton");
var timer;
var questionCount;
var startUpEl = document.querySelector("#startUp");
var questionsEl = document.querySelector("#questions");
var questionEl = document.querySelector("#question");
var optionButton = document.querySelectorAll("button.optionButton")
var option1Button = document.querySelector("#option1");
var option2Button = document.querySelector("#option2");
var option3Button = document.querySelector("#option3");
var option4Button = document.querySelector("#option4");

start.addEventListener("click", startQuiz);

function countdownTimer() {
    timer = 75;
    var countdown = setInterval(function () {

        if (timer <= 0) {
            clearInterval(countdown);
            document.getElementById("clock").innerHTML = "Time has expired!";
        } else {
            document.getElementById("clock").innerHTML = "Time: " + timer;
            timer -= 1;
        }
    }, 1000);
}

function startQuiz() {
    startUpEl.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    countdownTimer();
    askQuestions(questionCount);
}

function askQuestions(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        option1Button.textContent = questions[id].options[0];
        option2Button.textContent = questions[id].options[1];
        option3Button.textContent = questions[id].options[2];
        option4Button.textContent = questions[id].options[3];
    }
}

function checkAnswer() {
    console.log("Button clicked")
}

optionButton.forEach(item => {
    item.addEventListener("click", checkAnswer);
});