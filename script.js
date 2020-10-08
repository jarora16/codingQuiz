//arrray of the quiz questions, avaialble choices, and correct answers     
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["Strings", "booleans", "integers", "numbers"],
        answer: "integers"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "curly brackets"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "How can you add a comment in a JavaScript?",
        choices: ["This is a comment", "// This is a comment", "'This is a comment'", "*This is a comment"],
        answer: "// This is a comment"
    },
    {
        title: "How do you create a function in Javascript?",
        choices: ["function myfunction()", "function : myFunction()", "function =  myFunction()", "Using a for loop"],
        answer: "function myfunction()"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },
    {
        title: "How do you call myFunction()",
        choices: ["function myfunction()", "function = myFunction()", "myFunction()", "call myFunction()"],
        answer: "myFunction()"
    },
    {
        title: "How do you round the number 7.25, to the nearest integer",
        choices: ["rnd(7.25)", "round(7.25)", "Math.round(7.25)", "Math.rnd(7.25)"],
        answer: "Math.round(7.25)"
    },
    {
        title: "Which operator is used to assign a vlue to a variable",
        choices: ["*", "X", "-", "="],
        answer: "="
    }

];

//Initialize the variables 
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//starts the countdown timer once you start the quiz
function start()
{

    timeLeft = 75;
    document.getElementById("timeLeft").innerHTML = timeLeft;

        timer = setInterval(function ()
        {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        //proceed to end the game function when timer is below 0 at any time
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(); 
        }
    }, 1000);

    next();
}


//stop the timer when you finish 
function endGame()
{
    clearInterval(timer);

    var quizContent = `
    <h2>Game over!</h2>
    <h3>You got a ` + score +  ` /100!</h3>
    <h3>That means you got ` + score / 20 +  ` questions correct!</h3>
    <input type="text" id="name" placeholder="First name"> 
    <button onclick="setScore()">Set score!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}


//store the scores on local storage
function setScore()
{
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    getScore();
}

// get the user scores on page 
function getScore()
{
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 

    <button onclick="clearScore()"> Clear score! </button>
    <button onclick="resetGame()"> Play Again! </button>

    `;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//clears the records when the user presses "clear the scores"
function clearScore()
{
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");

    resetGame();
}

//reset the game 
function resetGame()
{
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizContent = `
    <h1>
        JavaScript Quiz!
    </h1>
    <h3>
        Click to play!   
    </h3>
    <button onclick="start()"> Start! </button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//deduct 15seconds from the timer if user chooses an incorrect answer
function incorrect()
{
    timeLeft -= 15; 
    next();
}

//increases the score by 20points if the user chooses the correct answer
function correct()
{
    score += 20;
    next();
}

//loops through the questions 
function next()
{
    currentQuestion++;

    if (currentQuestion > questions.length - 1)
    {
        endGame();
        return;
    }

    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
    quizContent += buttonCode
}


document.getElementById("quizBody").innerHTML = quizContent;
}
