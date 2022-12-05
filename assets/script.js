/*  
    It makes it really easy to cheat but I put the questions here for referance:

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

//////////////////////////////////////////////////////////////////////////////////////

//variables
//a variable for each section of content I'd like to work with
var highScoreButton = document.querySelector("#timeBar > a");
var timeCounter = document.querySelector("#timeBar > .time");
var startButton = document.querySelector("#startButton");
var startScreen = document.querySelector("#start");
var questionSection = document.querySelector("#question");
var endScreen = document.querySelector("#end");
var highscoreScreen = document.querySelector("#highScores");
var userName = endScreen.querySelector('input[type="text"]');
var submitButton = endScreen.querySelector('input[type="submit"]');

var timerId = null;
var timeLeft = null;

var inMiddleOfQuiz = false;

//functions
//hides everything
function clearPage(){
    for(let elem of document.body.children){
        elem.setAttribute("style", "display: none");
    }
}

function refillQuestions(){
    questions = [question1, question2, question3, question4, question5, question6];
}

//shows or hides the start section depending on what it currently is
//if hidden it shows
function hideShowStart(){
    startScreen.hasAttribute("style") ? startScreen.removeAttribute("style") : startScreen.setAttribute("style", "display: none");
}

function startTimer(){
    timerId = setInterval(function(){
        if(timeLeft > 0){
            timeLeft--;
            updateTimer();
        }else{
            enterHighScore();
        }
    }, 1000);
}

function updateTimer(){
    timeCounter.textContent = timeLeft;
}

function pauseTimer(){
    clearInterval(timerId);
}

//This is what kicks everything off
function beginQuiz(event){
    event.preventDefault();
    timeLeft = questions.length * 15;
    hideShowStart();
    startTimer();
    loadNextQuestion();
    inMiddleOfQuiz = true;
}

function loadNextQuestion(){
    //chooses a question from the list and then removes it
    let lastQuestion = questions.length <= 1;
    let index = Math.floor(Math.random() * (questions.length - 1));
    let q = lastQuestion ? questions[0] : questions[index];
    //moves the question out of the array if it's the last one
    if(!lastQuestion){
        let tempQ = questions[0];
        questions[0] = q;
        questions[index] = tempQ;
        questions.shift();
    }

    //first reset inner content so I can set it to what I want
    questionSection.innerHTML = "";
    //create the html to put in
    let qAsked = document.createElement("h1");
    let qGroup = document.createElement("div");
    let option1 = document.createElement("button");
    let option2 = document.createElement("button");
    let option3 = document.createElement("button");
    let option4 = document.createElement("button");
    //set the variable content to fit the question
    qAsked.textContent = q.question;
    option1.textContent = q.optionOne;
    option2.textContent = q.optionTwo;
    option3.textContent = q.optionThree;
    option4.textContent = q.optionFour;
    //wrap the questions in a group
    qGroup.appendChild(option1);
    qGroup.appendChild(option2);
    qGroup.appendChild(option3);
    qGroup.appendChild(option4);
    //assigns a class of correct to the answer of the question
    qGroup.childNodes[q.correct - 1].className = "correct";

    //add the logic of the listener to either take us to the next question or finalize the score
    qGroup.addEventListener("click", function(){
        event.preventDefault();
        if(event.target.localName === "button"){
            if(event.target.className === "correct"){
                lastQuestion ? enterHighScore() : loadNextQuestion();
            }else{
                lastQuestion ? enterHighScore() : wrongAnswer();
            }
        }
    });

    //adds them to the webpage
    questionSection.append(qAsked);
    questionSection.append(qGroup);
}

function wrongAnswer(){
    loadNextQuestion(); 
    timeLeft -= 15;
    updateTimer();
}

function enterHighScore(){
    pauseTimer();
    clearPage();
    inMiddleOfQuiz = false;
    questionSection.innerHTML = "";
    endScreen.removeAttribute("style");
    endScreen.querySelector(".highscore").textContent = timeLeft;

}

function gotoHighscores(event){
    event.preventDefault();
    pauseTimer();
    clearPage();
    highscoreScreen.removeAttribute("style");
}

//main logic
startButton.addEventListener("click", beginQuiz);
highScoreButton.addEventListener("click", gotoHighscores);
