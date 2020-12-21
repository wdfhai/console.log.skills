var questions = [
    "Which of the following is not an element in HTML?",
    "In CSS, IDs are linked using the following syntax...",
    "Which one of the following is a self-closing element?",
    "Which one of the following is NOT a semantic tag in HTML?",
    "In CSS, which is the outermost part of the box model?",
    "Which of the following is an example of 'object property' in Javascript?",
    "In Javascript, the Math.random function would NOT generate the following...",
    "In the array ['fruits', 'vegetables', 'meats', 'breads'], what is the index of 'fruits'?",
    "Which one of the following can NOT be used to store a variable in Javascript?",
    "Which tag is used to write Javascript code inside of an HTML file?",
];

var answersOne = ["position", "body", "header", "section"];
var answersTwo = ["#id", ".id", "$id", "&id"];
var answersThree = ["img", "div", "p", "h1"];
var answersFour = ["div", "section", "footer", "header"];
var answersFive = ["padding", "margin", "border", "content"];
var answersSix = ["addEventListener", "getElementById", "firstName:John", "array.join"];
var answersSeven = ["0", "0.5", "0.999", "1"];
var answersEight = ["1", "2", "1.1", "0",];
var answersNine = ["var", "make", "let", "const"];
var answersTen = ["style", "interact", "java", "script"];
var correctAnswers = ["position", "#id", "img", "div", "margin", "firstName:John", "1", "0", "make", "script"];
var answers = [answersOne, answersTwo, answersThree, answersFour, answersFive, answersSix, answersSeven, answersEight, answersNine, answersTen];

var clock = document.getElementById("countdown");
var questionNumber = document.getElementById("qNumber");
var questionContent = document.getElementById("qContent");
var choiceList = document.getElementById("choices");
var startIns = document.getElementById("startIns");
var startButton = document.getElementById("startButton");
var b1 = document.getElementById("b1");
var b2 = document.getElementById("b2");
var b3 = document.getElementById("b3");
var b4 = document.getElementById("b4");
var options = document.getElementById("options");
var score = 0;
var highScoresContainer = document.getElementById("highScoresContainer");
var initialsList = document.getElementById("initialsList");
var highScoresList = document.getElementById("hScoresList");
var choices = document.getElementById('choices');
var initials = "";
var initArray = [];
var scoreArray = [];
var qNum = 1;
var qText = 0;
let ansNum = 0;

var array = [0,1,2,3];
// Following function 'shuffleArray' is a modification or the Fisher-Yates algorithm, sometimes attributed as the Durstenfeld algorithm. 
// I used this function as there is no built in shuffle function for an array in Javascript.
// Fisher Yates (Knuth) algorithm link = https://github.com/Daplie/knuth-shuffle
// Durstenfeld algorithm reference (wikipedia) = https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
function shuffleArray() {
    for (let a = array.length - 1; a > 0; a--) {
        let b = Math.floor(Math.random() * (a + 1));
        [array[a], array[b]] = [array[b], array[a]];
    };
};

function nextQuestion() {
        questionNumber.innerHTML = "Question " + qNum;
        questionContent.innerHTML = questions[qText];
        qText++;
};

function assignChoices () {
    var ai = array[0];
    var bi = array[1];
    var ci = array[2];
    var di = array[3];
    b1.innerHTML = answers[ansNum][ai];
    b2.innerHTML = answers[ansNum][bi];
    b3.innerHTML = answers[ansNum][ci];
    b4.innerHTML = answers[ansNum][di];
    ansNum++;
};

var timeLeft = 60;
function countdown() {
    var timerDisplay = setInterval(function() {
        timeLeft--;
        clock.textContent = timeLeft;
        if (timeLeft === 0) {
            clock.textContent = "Time's Up!";
            quizOver();
            clearInterval(timerDisplay);
        } else if (questionNumber.innerHTML === "Quiz Over!"){
            clock.textContent = "You finished early!";
            clearInterval(timerDisplay);
        };  
    },1000);
};

function next() {
    shuffleArray();
    nextQuestion();
    assignChoices();
};

function disableStart() { 
    startButton.style.display = "none";
    startIns.style.display = "none";
};

function enableButtons() {
    options.style.display = "block";
};

function getInitials(){
    initials = prompt("Enter Your Initials.");
    while (!(initials.length === 2)) {
        initials = prompt("Please enter 2 characters");
    }
        alert("Thanks.");
        return;
};

function writePrevScore(){
    var storedHighScores = [];
    storedHighScores = JSON.parse(localStorage.getItem("score"));
    for (hs=0; hs < storedHighScores.length; hs++) {
    var previousScores = document.createElement("li");
    previousScores.textContent = storedHighScores[hs];
    highScoresList.appendChild(previousScores);
    };
};

function writePrevInits (){
    var storedInits = [];
    storedInits = JSON.parse(localStorage.getItem("initials"));
    for (si=0; si < storedInits.length; si++){
    var previousInitials = document.createElement("li");
    previousInitials.textContent = storedInits[si];
    initialsList.appendChild(previousInitials);
    };
};

function writeNewScore(){
    scoreArray = JSON.parse(localStorage.getItem("score")) || [];
    scoreArray.push(score);
    localStorage.setItem('score', JSON.stringify(scoreArray));
    JSON.parse(localStorage.getItem("score"));
};

function writeNewInits(){
    initArray = JSON.parse(localStorage.getItem("initials")) || [];
    initArray.push(initials);
    localStorage.setItem('initials', JSON.stringify(initArray));
    JSON.parse(localStorage.getItem("initials"));
};

function writeHighScore (){
    writeNewInits();
    writeNewScore();
    writePrevInits();
    writePrevScore();
};

function quizOver() {
    questionNumber.innerHTML = "Quiz Over!";
    questionContent.innerHTML = "Your score is "+ score +" out of 10";
    options.style.display = "none";
    highScoresContainer.style.display = "block";
    getInitials();
    writeHighScore();
};

choices.addEventListener('click', (event) => {
    var isButton = event.target.nodeName === "BUTTON";
    if (!isButton) {
    return;
    }
    var buttonPressed = event.target.innerHTML;
    if (qNum < 10){
        if (correctAnswers.includes(buttonPressed)){
            score++;
            qNum++;
            next();
            } else {
            timeLeft = timeLeft - 3;
            qNum++;
            next();
            };
        } else {
            if (correctAnswers.includes(buttonPressed)){
                score++;
                } else {
                timeLeft = timeLeft - 3;
                };
            quizOver();
        }
    }
);

startButton.addEventListener('click', disableStart);
startButton.addEventListener('click', countdown);
startButton.addEventListener('click', next);
startButton.addEventListener('click', enableButtons);