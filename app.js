let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  // to print game is started only when first time key is pressed when game was not started
  if (started == false) {
    console.log("game is started");
    started = true;

    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  //   random btn choose
  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);
  //   console.log(randIdx);
  //   console.log(randColor);
  //   console.log(randBtn);
  gameFlash(randBtn);
}

function checkAns(idx) {
  //   console.log("curr level : ", level);
  //   let idx = level - 1;

  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      // setTimeout is needed bcz in case if same color is flashed again which we pressed then, it won't be visible
      setTimeout(levelUp, 1000);
    }
  } else {
    if (highScore < level) {
      highScore = level;
    }
    h2.innerHTML = `Game Over! Your score was <b>${level}<b> <br> High Score : <b>${highScore}<b> <br> Press any key 
    to start.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

// All variables which are named as btn have different scope (function scope) so, they won't clash
function btnPress() {
  //   console.log(this);
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

// We can add sounds and rules (how to play) too..
// Homework Problem : Track highest score from all the games user play in one time and print it constantly on the
// screen

// Different approach for High score
// This code shows score 0 when we fail in level 1 but, above code shows score 1 even if we fail in level 1
// let highestScore = 0;
// let h = 0;
// highestScore = level - 1;
// h3.innerText = `Game Over!! (Press PLAYto restart the game...)  AND YOUR SCORE WAS ${highestScore}`;
// if (h < highestScore) {
//   h = highestScore;
//   scoure.innerText = h;
// }

// Another approach for High score calcuation (help)
// let hScore = [ ];
// hScore.push(level);
// for (let i = 0; i < hScore.length; i++) {
//     if (highScore < hScore[i]) {
//         highScore = hScore[i];
//     }
// }
// h2.innerHTML = <b>Your highest score is : ${highScore}</b>;
