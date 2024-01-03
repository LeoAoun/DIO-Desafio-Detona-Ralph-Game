const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lives: document.querySelector("#lives"),
  },
  values: {
    gameVelocity: 1000,
    lastSquareNumber: null,
    hitPosition: null,
    result: 0,
    currentTime: 60,
    totalLives: 3,
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countdown, 1000),
  },
};

function hitSound() {
  let hitAudio = new Audio(`./audios/hit.m4a`);
  hitAudio.volume = 0.1;
  hitAudio.play();
}

function gameOver() {
  clearInterval(state.actions.countDownTimerId);
  clearInterval(state.actions.timerId);

  alert("Game Over! O seu resultado foi: " + state.values.result);
  window.location.reload();
}

function countdown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime == 0) gameOver();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);

  // Evita que o quadrado apareça duas vezes seguidas
  // Avoids the square to appear twice in a row
  while (randomNumber == state.values.lastSquareNumber) {
    randomNumber = Math.floor(Math.random() * 9);
  }

  state.values.lastSquareNumber = randomNumber;

  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomNumber;
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id == state.values.hitPosition) {
        state.values.result++;
        hitSound();
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
      } else {
        console.log("errou");
        state.values.totalLives--;
        console.log(state.values.totalLives);
        state.view.lives.textContent = "x" + state.values.totalLives;

        setTimeout(() => {
          if (state.values.totalLives == 0) gameOver();
        }, 100);
      }
    });
  });
}

function initialize() {
  state.view.timeLeft.textContent = state.values.currentTime;
  state.view.score.textContent = state.values.result;
  state.view.lives.textContent = "x" + state.values.totalLives;
  addListenerHitBox();
}

initialize();
