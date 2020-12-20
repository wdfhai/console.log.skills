var questions = [
    "Which of the following is not an element in HTML?",
    "In CSS, IDs are linked using the following syntax...",
    "Which one of the following is a self-closing element?",
    "Which one of the following is NOT a semantic tag in HTML?",
    "In CSS, which is the outermost part of the box model?",
    "Which of the following is an example of 'object' in Javascript?",
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
var b1 = document.getElementById("1");
var b2 = document.getElementById("2");
var b3 = document.getElementById("3");
var b4 = document.getElementById("4");
var options = document.getElementById("options");
var score = 0;
var highScoresContainer = document.getElementById("highScoresContainer");
var initialsList = document.getElementById("initialsList");
// console.log(newInitials);
var highScoresList = document.getElementById("hScoresList");
var choices = document.getElementById('choices');
// console.log(newHighScores);
var initials = "";
var initArray = [];
var scoreArray = [];
var f = "";
var g = "";

var array = [0,1,2,3];
// Following function 'shuffleArray' is a modification or the Fisher-Yates algorithm, sometimes attributed as the Durstenfeld algorithm. 
// I used this function as there is no built in shuffle function for an array in Javascript.
// Fisher Yates (Knuth) algorithm link = https://github.com/Daplie/knuth-shuffle
// Durstenfeld algorithm reference (wikipedia) = https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
function shuffleArray() {
    for (let k = array.length - 1; k > 0; k--) {
        let j = Math.floor(Math.random() * (k + 1));
        [array[k], array[j]] = [array[j], array[k]];
    };
};

var q = 1;
var i = 0;
let v = 0;

function nextQuestion() {
        questionNumber.innerHTML = "Question " + q;
        questionContent.innerHTML = questions[i];
        i++;
};


function assignChoices () {
    var ai = array[0];
    var bi = array[1];
    var ci = array[2];
    var di = array[3];
    b1.innerHTML = answers[v][ai];
    b2.innerHTML = answers[v][bi];
    b3.innerHTML = answers[v][ci];
    b4.innerHTML = answers[v][di];
    v++;
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
        console.log(initials);
        return;
    };

function writePrevScore(){
    var storedHighScores = [];
    storedHighScores = JSON.parse(localStorage.getItem("score"));
    console.log(storedHighScores);
    console.log(storedHighScores.length);
    for (hs=0; hs < storedHighScores.length; hs++) {
    var previousScores = document.createElement("li");
    previousScores.textContent = storedHighScores[hs];
    highScoresList.appendChild(previousScores);
    };
};


function writePrevInits (){
    var storedInits = [];
    storedInits = JSON.parse(localStorage.getItem("initials"));
    console.log(storedInits);
    console.log(storedInits.length);

    for (si=0; si < storedInits.length; si++){
    var previousInitials = document.createElement("li");
    previousInitials.textContent = storedInits[si];
    initialsList.appendChild(previousInitials);
    };
};

function writeNewScore(){
    // let newHighScore = document.createElement("li");
    // newHighScore.textContent = score;
    // console.log(score);
    // highScoresList.appendChild(newHighScore);
    // localStorage.setItem("highScore", score);
    scoreArray = JSON.parse(localStorage.getItem("score")) || [];
    scoreArray.push(score);
    console.log(scoreArray);
    localStorage.setItem('score', JSON.stringify(scoreArray));
    var localScores = JSON.parse(localStorage.getItem("score"));
    console.log(localScores);
};

function writeNewInits(){
    // let newInitials = document.createElement("li");
    // newInitials.textContent = initials;
    // console.log(initials);
    // initialsList.appendChild(newInitials); 
    // localStorage.setItem('user', initials);
    initArray = JSON.parse(localStorage.getItem("initials")) || [];
    initArray.push(initials);
    console.log(initArray);
    localStorage.setItem('initials', JSON.stringify(initArray));
    var localInits = JSON.parse(localStorage.getItem("initials"));
    console.log(localInits);
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
    if (q < 10){
        if (correctAnswers.includes(buttonPressed)){
            score++;
            console.log(score);
            q++;
            next();
            } else {
            timeLeft = timeLeft - 3;
            q++;
            next();
            };
        } else {
            if (correctAnswers.includes(buttonPressed)){
                score++;
                console.log(score);
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