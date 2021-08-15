// Question array
const questions = [
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
const start = document.querySelector("#startButton");
let timer = 75;
let countdown;
const highScoreLink = document.querySelector("#highScoreLink");
const highScoreLinkButton = document.querySelector("#highScoreLinkButton");
let questionCount;
const clockEl = document.querySelector("#clock");
const startUpEl = document.querySelector("#startUp");
const questionsEl = document.querySelector("#questions");
const optionButton = document.querySelectorAll("button.optionButton")
const gameOver = document.querySelector("#timesUp");
const finalScore = document.querySelector("#finalScore");
const postScoreButton = document.querySelector("#postScore");
const highScores = document.querySelector("#highScores");
let highScoreList = [];
const highScoreListEl = document.querySelector("#highScoreList");
const postInitials = document.querySelector("#initials")
const goBack = document.querySelector("#goBack");
const clearHighScores = document.querySelector("#clearHighScores");

// Hide start section and show/start questions section
const startQuiz = () => {
    startUpEl.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    countdownTimer();
    askQuestions(questionCount);
}

// Countdown timer function
const countdownTimer = () => {
    timer = 75;
    clockEl.style.display = "block";
    countdown = setInterval(function () {
        // End game if time runs our or all questions answered
        if (timer === 0 || questionCount === questions.length) {
            clearInterval(countdown);
            questionsEl.style.display = "none";
            clockEl.style.display = "none";
            gameOver.style.display = "block";
            postInitials.value = "";
            // Avoid negative scores
            if (timer >= 0) {
                finalScore.textContent = timer;
            } else {
                finalScore.textContent = 0;
            }
        // Continue timer if time remaining and all questions not answered
        } else {
            clockEl.innerHTML = "Time: " + timer;
            timer -= 1;
        }
    }, 1000);
}

// Prepare questions and answers for display
const askQuestions = (id) => {
    const questionEl = document.querySelector("#question");
    const option1Button = document.querySelector("#option1");
    const option2Button = document.querySelector("#option2");
    const option3Button = document.querySelector("#option3");
    const option4Button = document.querySelector("#option4");
        if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        option1Button.textContent = questions[id].options[0];
        option2Button.textContent = questions[id].options[1];
        option3Button.textContent = questions[id].options[2];
        option4Button.textContent = questions[id].options[3];
    }
}

// Check to see if answers are correct
const checkAnswer = (event) => {
    const result = document.querySelector("#result");
    const p = document.createElement("p");
    event.preventDefault();
    // Show answer result section
    result.style.display = "block";
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

// Save score function
const saveScore = (event) => {
    // Capitalize initials
    let inits = postInitials.value.toUpperCase();
    event.preventDefault();
    // Hide game over section and show high scores section
    gameOver.style.display = "none";
    highScoreLink.style.display = "none";
    highScores.style.display = "block";
    // Add score and initials to score high array
    highScoreList.push({ initials: inits, score: finalScore.textContent });
    // Add score to high score list
    highScoreListEl.innerHTML = "";
    for (let i = 0; i < highScoreList.length; i++) {
        const li = document.createElement("li");
        li.textContent = highScoreList[i].initials + ': ' + highScoreList[i].score;
        highScoreListEl.append(li);
    }
    // Add score to local storage
    storeHighScores();
}

// Save scores to local storage
const storeHighScores = () => {
    localStorage.setItem("highScoreList", JSON.stringify(highScoreList));
}

// Clear scores function
const clearScores = () => {
    localStorage.clear();
    highScoreListEl.innerHTML = "";
    highScoreList = [];
}

// View high scores function
const viewHighScores = () => {
    let retrieveScores = localStorage.getItem("highScoreList");
    startUpEl.style.display = "none";
    questionsEl.style.display = "none";
    gameOver.style.display = "none";
    highScoreLink.style.display = "none";
    clearInterval(countdown);
    timer = 75;
    clockEl.textContent = "Time: " + timer;
    clockEl.style.display = "none";
    highScores.style.display = "block";
    retrieveScores = JSON.parse(retrieveScores);
    if (retrieveScores !== null) {
        highScoreList = [];
        highScoreListEl.innerHTML = "";
        for (let i = 0; i < retrieveScores.length; i++) {
            const li2 = document.createElement("li");
            li2.textContent = retrieveScores[i].initials + ": " + retrieveScores[i].score;
            highScoreListEl.appendChild(li2);
            highScoreList.push({ initials: retrieveScores[i].initials, score: retrieveScores[i].score });
        }
    }
}

// Start button event listener
start.addEventListener("click", startQuiz);

// Event listener for question answers
optionButton.forEach(item => {
    item.addEventListener("click", checkAnswer);
});

// Submit score event listener
postScoreButton.addEventListener("click", saveScore);

// Go back to start section
goBack.addEventListener("click", function() {
    highScores.style.display = "none";
    startUpEl.style.display = "block";
    highScoreLink.style.display = "block";
    timer = 75;
})

// Clear scores event listener
clearHighScores.addEventListener("click", clearScores);

// View high scores event listener
highScoreLinkButton.addEventListener("click", viewHighScores);