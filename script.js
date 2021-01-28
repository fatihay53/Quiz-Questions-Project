var questions = [
    {
        question: "What is the World Population ?",
        answers: ["4 billion", "6.5 Billion", "7.5 Billion"],
        correct: "7.5 Billion"
    },
    {
        question: "How many countries are there in the world? ",
        answers: ["175", "195", "205"],
        correct: "195"
    },
    {
        question: "How many official languages are spoken in the world?",
        answers: ["6500", "4000", "5000"],
        correct: "6500"
    },
    {
        question: "How many continents are there in the world?",
        answers: ["5", "6", "7"],
        correct: "7"
    },
    {
        question: "What is the population of Canada 2020?",
        answers: ["33.5 Millions", "35.5 Millions", "37.5 Millions"],
        correct: "37.5 Millions"
    }
]


var start = document.querySelector("#start");
var quizPage = document.querySelector("#quizPage");
var questionBox = document.querySelector("#questionBox");
var timerArea = document.getElementById("countdown");
var cardtop = document.getElementById("#cardtop");
var gameFinishTime = 60;
var questionNumber = 0;
var timeIntervalObj = null;
var arraytest = []

function startQuiz() {
    start.style.display = "none";
    quizPage.style.display = "block"
    getTimer();
    getNextQuestion(questionNumber);
    
}

function getNextQuestion(questionNumber = 0) {


    if (questionNumber > 4) {
        finishGame();
    }

    questionBox.innerHTML = "<h3>" + questions[questionNumber].question + "</h3>";
    var answers = questions[questionNumber].answers;

    for (var i = 0; i < answers.length; i++) {
        var answer = answers[i]

        questionBox.innerHTML += `<button id='${i}' onClick="checkAnswer(event,'${answer}','${i}')" class="btn btn-info" style="margin:5px;width: 200px;border-radius:15px">${answer}</button></br>`;
    }
}

function checkAnswer(event, answer, correctId) {
    event.preventDefault();

    if (questions[questionNumber].correct === answer) {
        questionNumber += 1;
        var correctAnswer = document.getElementById(correctId);
        correctAnswer.style.backgroundColor = "green";
        setTimeout(function () { getNextQuestion(questionNumber) }, 500);
    } else {
        questionNumber += 1;
        var correctAnswer = document.getElementById(correctId);
        correctAnswer.style.backgroundColor = "red";
        timeDecrease(10);
        setTimeout(function () { getNextQuestion(questionNumber) }, 500);
    }
}


function getTimer() {
    timerArea.textContent = gameFinishTime;
    timeIntervalObj = setInterval(timeDecrease, 1000);
}

function timeDecrease(byvalue = 1) {
    gameFinishTime -= byvalue;
    if (gameFinishTime <= 0) {
        gameFinishTime = 0;
        finishGame();
    }
    timerArea.textContent = gameFinishTime;
}

function finishGame() {
    questionBox.innerHTML = "Player Name:<input id='playerName' type='text'></input> </br><button id='saveBtn' class='btn btn-primary' onClick='save(event)'>Save</button>";
    clearInterval(timeIntervalObj);
}
function save(event) {

    event.preventDefault()
    

    if (localStorage.getItem("arraytest")) {


        var x = localStorage.getItem('arraytest')
        arraytest = JSON.parse(x)
    }

    while (document.getElementById("listid")) {
        document.getElementById('listid').remove()


    }


    playerName = document.getElementById('playerName').value
    arraytest.push({ 'quiz': { 'name': `${playerName}`, 'score': `${timerArea.textContent}` } });
    localStorage.setItem('arraytest', JSON.stringify(arraytest));
    var retrievedObject = localStorage.getItem('arraytest');
    var jason = JSON.parse(retrievedObject)




    for (var i = 0; i < jason.length; i++) {
        var score = jason[i].quiz.score;
        var name = jason[i].quiz.name;

        const li = document.createElement('li')
        li.setAttribute('class', 'list-group-item')
        li.setAttribute('id', 'listid')
        li.textContent = `${name}  : ${score} pts`
        document.getElementById('list').appendChild(li);
    }

}

function startingOverAgain() {

    if (document.getElementById('listid')) {

    }
    else {
        if (localStorage.getItem("arraytest")) {

            var retrievedObject = localStorage.getItem('arraytest');
            var jason = JSON.parse(retrievedObject)



            for (var i = 0; i < jason.length; i++) {
                var score = jason[i].quiz.score;
                var name = jason[i].quiz.name;

                const li = document.createElement('li')
                li.setAttribute('class', 'list-group-item')
                li.setAttribute('id', 'listid')
                li.textContent = `${name}  : ${score} pts`
                document.getElementById('list').appendChild(li);
            }
        }
    }
}
function clearlist() {

    while (document.getElementById("listid")) {
        document.getElementById('listid').remove()

        
    }
    arraytest = []
    localStorage.clear()
}
startingOverAgain()