// Question array
var questions = [
    {
        question: "Commonly Used data types DO NOT include:",
        options: ["strings", "alerts", "booleans", "numbers"],
        correct: "2"
    },
    {
        question: "The condition in an if / else statment is enclosed within ________:",
        options: ["quotes", "curly brackets", "parentheses", "square brackets"],
        correct: "3"
    },
    {
        question: "Arrays in JavaScript can be used to store ________:",
        options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correct: "4"
    },
    {
        question: "String values must be enclosed within ________ when being assigned to variables.",
        options: ["commas", "curly brackets", "quotes", "parentheses"],
        correct: "3"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        correct: "4"
    }
]

// Declare all global variables
var start = document.querySelector("#startButton");
var timer;
var highScoreLink = document.querySelector("#highScoreLink");
var questionCount;
var clockEl = document.querySelector("#clock");
var startUpEl = document.querySelector("#startUp");
var questionsEl = document.querySelector("#questions");
var questionEl = document.querySelector("#question");
var optionButton = document.querySelectorAll("button.optionButton")
var option1Button = document.querySelector("#option1");
var option2Button = document.querySelector("#option2");
var option3Button = document.querySelector("#option3");
var option4Button = document.querySelector("#option4");
var result = document.querySelector("#result");
var gameOver = document.querySelector("#timesUp");
var finalScore = document.querySelector("#finalScore");
var postScoreButton = document.querySelector("#postScore");
var highScores = document.querySelector("#highScores");
var highScoreList = [];
var highScoreListEl = document.querySelector("#highScoreList");
var postInitials = document.querySelector("#initials")
var goBack = document.querySelector("#goBack");
var clearHighScores = document.querySelector("#clearHighScores");

// Start button event listener
start.addEventListener("click", startQuiz);

// Countdown timer function
function countdownTimer() {
    timer = 75;
    var countdown = setInterval(function () {
        // End game if time runs our or all questions answered
        if (timer === 0 || questionCount === questions.length) {
            clearInterval(countdown);
            document.getElementById("clock").innerHTML = "Game over!";
            questionsEl.style.display = "none";
            clockEl.style.display = "none";
            gameOver.style.display = "block";
            // Avoid negative scores
            if (timer >= 0) {
                finalScore.textContent = timer;
            } else {
                finalScore.textContent = 0;
            }
        // Continue timer if time remaining and all questions not answered
        } else {
            document.getElementById("clock").innerHTML = "Time: " + timer;
            timer -= 1;
        }
    }, 1000);
}

// Hide start section and show/start questions section
function startQuiz() {
    startUpEl.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    countdownTimer();
    askQuestions(questionCount);
}

// Prepare questions and answers for display
function askQuestions(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        option1Button.textContent = questions[id].options[0];
        option2Button.textContent = questions[id].options[1];
        option3Button.textContent = questions[id].options[2];
        option4Button.textContent = questions[id].options[3];
    }
}

// Check to see if answers are correct
function checkAnswer(event) {
    event.preventDefault();
    // Show answer result section
    result.style.display = "block";
    var p = document.createElement("p");
    result.appendChild(p);
    // Display result message for 1 second
    setTimeout(function () {
        p.style.display = "none";
    }, 1000);
    // Check to see if each answer is correct or wrong and post results to answer result section
    if (questions[questionCount].correct === event.target.value) {
        p.textContent = "Correct!";
    } else if (questions[questionCount].correct !== event.target.value) {
        timer = timer - 10;
        p.textContent = "Wrong!";
    }
    // Increment question number
    if (questionCount < questions.length) {
        questionCount++;
    }
    // Ask next question
    askQuestions(questionCount);
}

// Event listener for question answers
optionButton.forEach(item => {
    item.addEventListener("click", checkAnswer);
});

// Save score function
function saveScore(event) {
    event.preventDefault();
    // Hide game over section and show high scores section
    gameOver.style.display = "none";
    highScoreLink.style.display = "none";
    highScores.style.display = "block";
    // Capitalize initials
    var inits = postInitials.value.toUpperCase();
    // Add score and initials to score high array
    highScoreList.push({ initials: inits, score: finalScore.textContent });
    // Add score to high score list
    for (var i = 0; i < highScoreList.length; i++) {
        var li = document.createElement("li");
        li.textContent = highScoreList[i].initials + ': ' + highScoreList[i].score;
        highScoreListEl.append(li);
    }
    // Add score to local storage
    storeHighScores();
}

// Submit score event listener
postScoreButton.addEventListener("click", saveScore);

// Save scores to local storage
function storeHighScores() {
    localStorage.setItem("scoreList", JSON.stringify(highScoreList));
}

// Go back to start section
goBack.addEventListener("click", function() {
    highScores.style.display = "none";
    startUpEl.style.display = "block";
})

// Clear scores event listener
clearHighScores.addEventListener("click", clearScores);

// Clear scores function
function clearScores() {
    localStorage.clear();
    highScoreListEl.innerHTML = "";
    highScoreList = [];
}