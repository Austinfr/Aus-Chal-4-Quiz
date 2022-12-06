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
//can add more questions here
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
var navBar = document.querySelector("#timeBar");
var highScoreButton = navBar.querySelector("a");
var timeCounter = navBar.querySelector("#time");
var startButton = document.querySelector("#startButton");
var startScreen = document.querySelector("#start");
var questionSection = document.querySelector("#question");
var endScreen = document.querySelector("#end");
var highscoreScreen = document.querySelector("#highScores");
var userName = endScreen.querySelector('input[type="text"]');
var submitButton = endScreen.querySelector('input[type="submit"]');
var scoresList = highscoreScreen.querySelector("#scoreList");
var backButton = highscoreScreen.querySelector("#goBack");
var clearHighScores = highscoreScreen.querySelector("#clear");
var answerValiditySection = document.querySelector("#correctOrNot");

var timerId = null; //the Id returned by setInterval
var timeLeft = null; //Time left for the quiz and the score

var inMiddleOfQuiz = false; //when the user moves to the highscore section
var users = []; //stores the scores and names associated

//functions
//sets the attribute of display none for each of the main elements
function clearPage(){
    for(let elem of document.body.children){
        if(elem.id !== "correctOrNot"){
            elem.setAttribute("style", "display: none");
        }
    }
}
//puts the questions back in the array
function refillQuestions(){
    questions = [question1, question2, question3, question4, question5, question6];
}

//shows or hides the element given depending on what it currently is
//if hidden it shows
function hideShow(element){
    element.hasAttribute("style") ? element.removeAttribute("style") : element.setAttribute("style", "display: none");
}

//starts the timer to tick down every second
function startTimer(){
    //sets an interval for every 1000 milliseconds
    timerId = setInterval(function(){
        //game over case
        if(timeLeft > 0){
            timeLeft--;
            updateTimer();
        }else{
            enterHighScore(true);
        }
    }, 1000);
}
//updates when it ticks down or a question was answered incorrectly
function updateTimer(){
    timeCounter.textContent = timeLeft;
}
//pauses the timer to goto the highscores
function pauseTimer(){
    clearInterval(timerId);
}

//This is what kicks everything off
function beginQuiz(event){
    event.preventDefault();
    //if you're coming back for a second time
    if(questions.length === 0){
        refillQuestions();
    }

    //sets up the time
    timeLeft = questions.length * 15;
    updateTimer();
    //hides the startscreen starts the timer and the question
    hideShow(startScreen);
    startTimer();
    loadNextQuestion();
    inMiddleOfQuiz = true;

}
//loads the next question from the array by selecting a random one within it and then moving it out of the array
//sets up the html to be displayed based on the function and loads it to the page
function loadNextQuestion(){
    //if it's hidden make it not hidden
    if(questionSection.hasAttribute("style")){
        questionSection.removeAttribute("style")
    }
    //chooses a question from the list and then removes it
    let lastQuestion = questions.length <= 1;
    let index = Math.floor(Math.random() * questions.length);
    let q = lastQuestion ? questions[0] : questions[index];
    //moves the question out of the array if it's the last one
    if(!lastQuestion){
        let tempQ = questions[0];
        questions[0] = q;
        questions[index] = tempQ;
        questions.shift();
    }else{
        questions.pop();
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
    //adds a container class for the answers
    qGroup.classList.add("questionGroup")
    //assigns a class of correct to the answer of the question
    qGroup.childNodes[q.correct - 1].className = "correct";
    //adds the button class to each of the options for styling
    for(let elem of qGroup.childNodes){
        elem.classList.add("button");
    }

    //add the logic of the listener to either take us to the next question or finalize the score
    qGroup.addEventListener("click", function(){
        event.preventDefault();
        if(event.target.matches("button")){
            //checks if the user got it correct or not
            if(event.target.classList.contains("correct")){
                gotQuestion(true);
            }else{
                timeLeft -= 15;
                updateTimer();
                gotQuestion(false);
            }
            //depending on if it's the last question or not
            //it will either load another or go to enter the highscore
            if(!lastQuestion){
                loadNextQuestion();
            }else{
                enterHighScore();
            }
        }
    });

    //adds them to the webpage
    questionSection.append(qAsked);
    questionSection.append(qGroup);
}
//displays a little thing at the bottom depending on how you answered the question
function gotQuestion(wasCorrect){
    answerValiditySection.innerHTML="";
    //sets it to light and skewed sorta 
    answerValiditySection.setAttribute("opacity", "0.4");
    answerValiditySection.setAttribute("font-style", "italic");
    answerValiditySection.append(document.createElement("hr"));
    
    let text = document.createElement("p");
    if(wasCorrect){
        text.innerText = "Correct!";
    }else{
        text.innerText = "Wrong!";
    }
    answerValiditySection.append(text);
    let tempId = setInterval(function(){
        answerValiditySection.innerHTML = "";
        clearInterval(tempId);
    }, 400);
}
//goes to the enter highscore screen from the last question
function enterHighScore(){
    if(timeLeft < 0){
        timeLeft = 0;
    }
    pauseTimer();
    clearPage();
    inMiddleOfQuiz = false;
    questionSection.innerHTML = "";
    endScreen.removeAttribute("style");
    endScreen.querySelector(".highscore").textContent = timeLeft;
}
//when the highscore tag or button is pressed
function gotoHighscores(event){
    event.preventDefault();
    pauseTimer();
    clearPage();
    loadHighscores();
}
//puts the highscores that are stored to the webpage
function loadHighscores(){
    //checks if there're any stored
    var storedUsers = JSON.parse(localStorage.getItem("Users"));
    if(storedUsers !== null){
        users = storedUsers;
    }
    //shows the highscores
    highscoreScreen.removeAttribute("style");
    //clears it to put in all stored scores
    scoresList.innerHTML = "";
    //goes through the list creating a list element for each and displaying it
    for(let user of users){
        let listItem = document.createElement("li");
        listItem.textContent = user;
        listItem.classList.add("scoreListItem");
        scoresList.append(listItem);
    }
}
//when the submit button is clicked this uploads the highscore with the username
function submitUserScore(event){
    event.preventDefault();
    //if the field is empty it won't submit
    if(!(userName.value === "")){
        users.push(userName.value + " - " + timeLeft);
        localStorage.setItem("Users", JSON.stringify(users));
        userName.value = "";
        clearPage();
        loadHighscores();
    }
}
//when the clear scores button is pressed
function clearStoredScores(event){
    event.preventDefault();
    if(users.length > 0){
        users = [];
        localStorage.setItem("Users", JSON.stringify(users));
        loadHighscores();
    }
}
//for when you go back from the highscores during the middle of a quiz
function returnToQuestions(){
    hideShow(questionSection);
    startTimer();
}
//functionality for the button labeled go back
function returnToStart(event){
    event.preventDefault();
    clearPage();
    hideShow(navBar);
    if(inMiddleOfQuiz){
        returnToQuestions()
    }else{
        hideShow(startScreen);
        timeCounter.textContent = 0;
    }
}

//all the button listeners
startButton.addEventListener("click", beginQuiz);
highScoreButton.addEventListener("click", gotoHighscores);
submitButton.addEventListener("click", submitUserScore);
backButton.addEventListener("click", returnToStart);
clearHighScores.addEventListener("click", clearStoredScores);