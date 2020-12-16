var questions = [
    "Which of the following is not an element in HTML?",
    "In CSS, IDs are linked using the following syntax...",
    "Which one of the following is a self-closing element?",
    "Which one of the following is NOT a semantic tag in HTML?",
    "In CSS, which is the outermost part of the box model?",
    "Which of the following is an example of 'properties' in Javascript?",
    "In Javascript, the Math.random function would NOT generate the following...",
    "In the array ['fruits', 'vegetables', 'meats', 'breads'], what is the index of 'fruits'?",
    "Which one of the following can NOT be used to store a variable in Javascript?",
    "Which tag is used to write Javascript code inside of an HTML file?",
];

var answersOne = ["position", "body", "header", "section"];
var answersTwo = ["#id", ".id", "$id", "&id"];
var answersThree = ["img", "div", "p", "h1"];
var answersFour = ["div", "section", "footer","header"];
var answersFive = ["padding", "margin", "border", "content"];
var answersSix = ["addEventListener", "getElementById", "firstName:John", "array.join"];
var answersSeven = ["0", "0.5", "0.99999", "1"];
var answersEight = ["1", "2", "1.1", "0",];
var answersNine = ["var", "make", "let", "const"];
var answersTen = ["style", "interact", "java", "script"];
var answers = [answersOne, answersTwo, answersThree, answersFour, answersFive, answersSix, answersSeven, answersEight, answersNine, answersTen];
var clock = document.getElementById("countdown");
var questionNumber = document.getElementById("qNumber");
var questionContent = document.getElementById("qContent");
var choiceList = document.getElementById("choices");
var startButton = document.getElementById("startButton");
var b1 = document.getElementById("1");
var b2 = document.getElementById("2");
var b3 = document.getElementById("3");
var b4 = document.getElementById("4");


var array = [0, 1, 2, 3];
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
let v = 1;

function nextQuestionAndAnswer() {
        questionNumber.innerHTML = "Question " + q;
        q++;
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


function countdown() {
    var timeLeft = 6;
    var timerDisplay = setInterval(function() {
        timeLeft--;
        clock.textContent = timeLeft;

        if (timeLeft === 0) {
            clock.textContent = "Time's Up!";
            quizOver();
            clearInterval(timerDisplay);
        };
    },1000);


};

function quizOver() {
    questionNumber.innerHTML = "Quiz Over!";
    questionContent.innerHTML = "Your score is out of 10";
};


var choices = document.getElementById('choices');
choices.addEventListener('click', (event) => {
    var isButton = event.target.nodeName === "BUTTON";
    if (!isButton) {
    return;
    }
    console.log("Button pressed");
    console.log(event.target.id);
})

function disableStart() { 
    startButton.disabled = true;
};

function next() {
    countdown();
    shuffleArray();
    nextQuestionAndAnswer();
    assignChoices();
};

startButton.addEventListener('click', disableStart);
startButton.addEventListener('click', next);