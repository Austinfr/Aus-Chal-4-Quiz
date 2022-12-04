/*  Put Questions here:

    Which html tag does javascript go inside?
    1.<javascript>
    2.<script> //correct
    3.<js>
    4.<scripting>

    What function is used to display a message popup?
    1.alert() //correct
    2.Math.random()
    3.popup()
    4.message()

    How do you create a function in javascript?
    1.function = myFunction()
    2.function:myFunction()
    3.function myFunction() //correct
    4.function()

    Which is the correct way to write a javascript array?
    1.var trees = 1 = ("oak"),2 = ("birch"),3 = ("aspin")
    2.var trees = "oak","birch","aspin"
    3.var trees = (1:"oak",2:"birch",3:"aspin")
    4.var trees = ["oak", "birch", "aspin"] //correct

    How do you compare type and variable equality in javascript?
    1.=
    2.=== //correct
    3.==
    4.====

    How do you declare a varaible in javascript?
    1.var i = 50 //correct
    2.int i = 50
    3.variable 1 = 50
    4.i = 50

*/

const question1 = {
    question: "Which html tag does javascript go inside?",
    optionOne: "<javascript>",
    optionTwo: "<script>",
    optionThree: "<js>",
    optionFour: "<scripting>",
    correct: 2
}
const question2 = {
    question: "What function is used to display a message popup?",
    optionOne: "alert()",
    optionTwo: "Math.random()",
    optionThree: "popup()",
    optionFour: "message()",
    correct: 1
}
const question3 = {
    question: "How do you create a function in javascript?",
    optionOne: "function = myFunction()",
    optionTwo: "function:myFunction()",
    optionThree: "function myFunction()",
    optionFour: "function()",
    correct: 3
}
const question4 = {
    question: "Which is the correct way to write a javascript array?",
    optionOne: "var trees = 1 = (\"oak\"),2 = (\"birch\"),3 = (\"aspin\")",
    optionTwo: "var trees = \"oak\",\"birch\",\"aspin\"",
    optionThree: "var trees = (1:\"oak\",2:\"birch\",3:\"aspin\")",
    optionFour: "var trees = [\"oak\", \"birch\", \"aspin\"]",
    correct: 4
}
const question5 = {
    question: "How do you compare type and variable equality in javascript?",
    optionOne: "=",
    optionTwo: "===",
    optionThree: "==",
    optionFour: "====",
    correct: 2
}
const question6 = {
    question: "How do you declare a varaible in javascript?",
    optionOne: "var i = 50",
    optionTwo: "int i = 50",
    optionThree: "variable 1 = 50",
    optionFour: "i = 50",
    correct: 1
}

var questions = [question1, question2, question3, question4, question5, question6];

////////////////////////////////////////////////////

//variables
var highScoreButton = document.querySelector("#highScoresNTime > a");
var sButton = document.querySelector("#startButton");
var startScreen = document.querySelector("#start");
var questionSection = document.querySelector("#question");
var endScreen = document.querySelector("#end");

//functions
function clearPage(){
    document.body.innerHTML = '';
}

function refillQuestions(){
    questions = [question1, question2, question3, question4, question5, question6];
}

function hideShowStart(){
    startScreen.hasAttribute("style") ? startScreen.removeAttribute("style") : startScreen.style.display = "none";
}

function beginQuiz(event){
    event.preventDefault();
    hideShowStart();
    console.log("cleared");

}

function loadNextQuestion(){
    //choose question
    let lastQuestion = questions.length <= 1;
    let index = Math.random() * (questions.length - 1);
    let q = lastQuestion ? questions[0] : questions[index];
    if(!lastQuestion){
        let tempQ = questions[0];
        questions[0] = q;
        questions[index] = tempQ;
        questions.shift();
    }

    //first reset
    questionSection.innerHTML = "";
    //create the html to put in
    document.createElement("h1");
    document.createElement();
}

function gotoHighscores(){
    clearPage();
}

//main logic
sButton.addEventListener("click", beginQuiz);
highScoreButton.addEventListener("click", gotoHighscores);