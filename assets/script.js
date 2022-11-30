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

//variables
var highScoreButton = document.querySelector(".highScoresNTime > a");
var sButton = document.querySelector("#startButton");
console.log(highScoreButton);

//functions
function clearPage(){
    document.body.innerHTML = '';
}

function beginQuiz(event){
    event.preventDefault();
    document.querySelector(".start").innerHTML = '';
    console.log("cleared");
}

function gotoHighscores(){
    clearPage();
}

//main logic
sButton.addEventListener("click", beginQuiz);
highScoreButton.addEventListener("click", gotoHighscores);