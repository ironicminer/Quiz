function allHighscores() {
  let highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  highscores.forEach(function (score) {
    let list = document.createElement("li");
    list.textContent = score.initials + " " + score.score;

    let orderLi = document.getElementById("highscores");
    orderLi.appendChild(list);
  });
}

function clearScores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}
document.getElementById("clear").onclick = clearScores;

allHighscores();
