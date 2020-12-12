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
]

var answers = [
    "position",
    "#id",
    "img",
    "div",
    "margin",
    "firstName:John",
    "1",
    "0",
    "make",
    "<script>"
]

var clock = document.getElementById("countdown");

var questionNumber = document.getElementById("qNumber");
var questionContent = document.getElementById("qContent");
var q = 1;
var i = 0;

function nextQuestion() {
    questionNumber.innerHTML = "Question " + q;
    q++;
    questionContent.innerHTML = questions[i];
    i++;

}

function countdown() {
    var timeleft = 10;
    var timerInterval = setInterval(function() {
        timeleft--;
        clock.textContent = timeleft;

        if (timeleft === 0) {
            timeleft = timeleft + 10;
            nextQuestion();
        }
    },1000);
}

var begin = document.getElementById("startButton");
begin.addEventListener('click', countdown);
begin.addEventListener('click', nextQuestion);