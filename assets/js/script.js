var timerEl = document.getElementById("timer");
var questionEl = document.getElementById("question/title");
var instructionEl = document.getElementById("instructions");
var startButtonEl = document.querySelector("#start");
var allButtons = document.querySelector(".anwserButtons");
var btn1 = document.getElementById("anwser1");
var btn2 = document.getElementById("anwser2");
var btn3 = document.getElementById("anwser3");
var btn4 = document.getElementById("anwser4");
var anwserDisplays = document.querySelector(".anwserDisplays");
var correctDisplay = document.getElementById("correctDisplay");
var wrongDisplay = document.getElementById("wrongDisplay");
var timeLeft = 0;
var finalScore = 0;

timerEl.setAttribute("style","text-align: right");
var questionNum = 0;

function startQuiz(){
    instructionEl.parentNode.removeChild(instructionEl);
    startButtonEl.parentNode.removeChild(startButtonEl);
    
    btn1.style = "display: inline";
    btn2.style = "display: inline";
    btn3.style = "display: inline";
    btn4.style = "display: inline";
    
    timer();
    displayQuestion();
}

function timer(){
  timeLeft = 69;

  var timeInterval = setInterval(function(){
    
    if(timeLeft > 0) {
      timerEl.textContent = 'Time: ' + timeLeft;
      timeLeft--;
    }else {
      timerEl.textContent = 'Time: ' + timeLeft;
      endOfGame();
      clearInterval(timeInterval);
      return;
    }
  }, 1000);
}

function displayQuestion() {
  var answer = questions[questionNum].correctAnwser;
  questionEl.textContent = questions[questionNum].question;

  btn1.innerHTML = questions[questionNum].option1;
  btn2.innerHTML = questions[questionNum].option2;
  btn3.innerHTML = questions[questionNum].option3;
  btn4.innerHTML = questions[questionNum].option4;

  btn1.addEventListener("click", clickFunction, {once: true});
  btn2.addEventListener("click", clickFunction, {once: true});
  btn3.addEventListener("click", clickFunction, {once: true});
  btn4.addEventListener("click", clickFunction, {once: true});
  
}

function clickFunction(event) {
  //checks if user selected correct answer
  var userAnswer = event.target.textContent
  if (userAnswer === questions[questionNum].correctAnwser) {
    correctDisplay.style = "display: inline";
    wrongDisplay.style = "display: none";
    finalScore++;
  } else {
    correctDisplay.style = "display: none";
    wrongDisplay.style = "display: inline";
    finalScore--;
    timeLeft = timeLeft - 5;
  }
  
  //determines next page to go to
  questionNum++;
  if (questionNum < 8) {
    displayQuestion()
  } else {
    endOfGame();
  }
}

function endOfGame(){
  //displays score/initials goes from quiz page to final score page
  var userInitials = document.querySelector("#name");
  var inputButton = document.querySelector("#submit");
  var anwserBtnDiv = document.getElementById("anwserButtons");

  questionEl.textContent = "All Done!";

  allButtons.removeChild(btn1);
  allButtons.removeChild(btn2);
  allButtons.removeChild(btn3);
  allButtons.removeChild(btn4);
  anwserBtnDiv.remove();
  anwserDisplays.removeChild(correctDisplay);
  anwserDisplays.removeChild(wrongDisplay);

  var displayScore = document.getElementById("finalScore"),
      scoreBoardForm = document.getElementById("form");

  displayScore.textContent = "Your final score is " + finalScore + ".";
  scoreBoardForm.style = "display: inline";
  
  inputButton.addEventListener("click", finalBtn)

  return;
}

function finalBtn(event) { //logs user score and name on button press
  event.preventDefault();
  var userInitials = document.querySelector("#name");
  var userName = userInitials.value.trim();

  localStorage.setItem(userInitials, finalScore);

  console.log({
    UserName: userName,
    Score: finalScore  
  });
}

startButtonEl.addEventListener("click",startQuiz);

const questions = [{
    question: "How many elements can be applied to an 'ID' attribute?",
    option1:  "3",
    option2:  "1",
    option3:  "128",
    option4:  "As many as needed",
    correctAnwser: "1"
  }, {
    question: "What does DOM stand for?",
    option1:  "Document Object Model",
    option2:  "Display Object Model",
    option3:  "Digital Object Module",
    option4:  "Desktop Origin Mode",
    correctAnwser: "Document Object Model"
  }, {
    question: "What is primarily used to add styling to a web page?",
    option1:  "HTML",
    option2:  "CSS",
    option3:  "Python",
    option4:  "Bootstrap",
    correctAnwser: "CSS"
  }, {
    question: "What HTML tags are used to wrap JavaScript code in?",
    option1:  "div tag",
    option2:  "link tag",
    option3:  "span tag",
    option4:  "script tag",
    correctAnwser: "script tag"
  }, {
    question: "When is localStorage data cleared?",
    option1:  "No expiration time",
    option2:  "On page reload",
    option3:  "On browser close",
    option4:  "On Computer restart",
    correctAnwser: "No expiration time"
  }, {
    question: "What does WWW stand for?",
    option1:  "Wild Wild West",
    option2:  "World Wide Web",
    option3:  "World Wide Webs",
    option4:  "Whirld Whide Wheb",
    correctAnwser: "World Wide Web"
  }, {
    question: "What HTML attribute references an external JavaScript file?",
    option1:  "href",
    option2:  "class",
    option3:  "src",
    option4:  "index",
    correctAnwser: "src"
  }, {
    question: "Who is the greatest movie charater of all time?",
    option1:  "Shrek",
    option2:  "Spiderman",
    option3:  "George Costanza",
    option4:  "Shrek but only in Shrek 2",
    correctAnwser: "Shrek but only in Shrek 2"
  
  }]
