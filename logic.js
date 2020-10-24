let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

let questionEl = document.getElementById("questions");
let timer = document.getElementById("time");
let choices = document.getElementById("choices");
let submitBtn = document.getElementById("submit");
let initialz = document.getElementById("initials");
let startBtn = document.getElementById("start");
let feedback = document.getElementById("feedback");

function startQuiz() {
  let startScreen = document.getElementById("start-screen");
  startScreen.setAttribute("class", "hide");

  questionEl.removeAttribute("class");

  //start the timer
  timerId = setInterval(clockTick, 1000);

  timer.textContent = time;

  //get question function
  getQuestion();
}

function getQuestion() {
  let currentQuestion = questions[currentQuestionIndex];

  let quesTitle = document.getElementById("question-title");
  quesTitle.textContent = currentQuestion.title;

  choices.innerHTML = "";

  currentQuestion.choices.forEach(function (choice, i) {
    let choiceValue = document.createElement("button");
    choiceValue.setAttribute("class", "choice");
    choiceValue.setAttribute("value", choice);

    choiceValue.textContent = i + 1 + ". " + choice;

    choiceValue.onclick = questionClick;

    choices.appendChild(choiceValue);
  });
}

function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 15;

    if (time < 0) {
      time = 0;
    }

    timer.textContent = timer;

    feedback.textContent = "Incorrect";
  } else {
    feedback.textContent = "Correct";
  }

  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    quizOver();
  } else {
    getQuestion();
  }
}
function quizOver() {
  clearInterval(timerId);

  let endScreen = document.getElementById("end-screen");
  endScreen.removeAttribute("class");

  let finalScore = document.getElementById("final-score");
  finalScore.textContent = time;
  questionEl.setAttribute("class", "hide");
}

function clockTick() {
  time--;
  timer.textContent = time;

  if (time <= 0) {
    quizOver();
  }
}
function saveScore() {
  let initials = initialz.value.trim();

  if (initials !== "") {
    let highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    let newScore = {
      score: time,
      initials: initials,
    };

    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.href = "highscore.html";
  }
}

function checkScore(event) {
  if (event.key === "Enter") {
    saveScore();
  }
}
submitBtn.onclick = saveScore;
startBtn.onclick = startQuiz;
initialz.onkeyup = checkScore;
