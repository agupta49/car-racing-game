const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

let player = { speed: 10 };

startScreen.addEventListener("click", start);

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e) {
  e.preventDefault();
  keys[e.key] = true;
}
function keyUp(e) {
  e.preventDefault();
  keys[e.key] = false;
}

function start() {
  startScreen.classList.add("hide");
  gameArea.innerHTML = "";
  player.start = true;
  player.score = 0;
  window.requestAnimationFrame(gamePlay);

  for (let x = 0; x < 10; x++) {
    let roadLine = document.createElement("div");
    roadLine.setAttribute("class", "lines");
    roadLine.y = x * 150;
    roadLine.style.top = roadLine.y + "px";
    gameArea.appendChild(roadLine);
  }

  let car = document.createElement("div");
  car.setAttribute("class", "car");
  gameArea.appendChild(car);

  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  for (let x = 0; x < 3; x++) {
    let enemyCar = document.createElement("div");
    enemyCar.setAttribute("class", "enemy");
    enemyCar.y = (x + 1) * 350 * -1;
    enemyCar.style.top = enemyCar.y + "px";
    enemyCar.style.backgroundColor = "blue";
    enemyCar.style.backgroundImage.url = "./car-2.jpg"
    enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
    gameArea.appendChild(enemyCar);
  }
}

function gamePlay() {
  let car = document.querySelector(".car");
  let road = gameArea.getBoundingClientRect();
  if (player.start) {
    moveLines();
    moveEnemy(car);
    if (keys.ArrowUp && player.y > road.top + 70) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < road.bottom - 85) {
      player.y += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < road.width - 70) {
      player.x += player.speed;
    }
    car.style.top = player.y + "px";
    car.style.left = player.x + "px";

    window.requestAnimationFrame(gamePlay);
    console.log(player.score++)
    player.score++;
    score.innerText = "Score: "+player.score;
  }
}

function isCollide(a, b) {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();

  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

function moveLines() {
  let lines = document.querySelectorAll(".lines");
  lines.forEach((item) => {
    if (item.y >= 800) {
      item.y -= 780;
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}
function moveEnemy(car) {
  let enemy = document.querySelectorAll(".enemy");
  enemy.forEach((item) => {
    if (isCollide(car, item)) {
      console.log("Boooom....");
      endGame()
    }
    if (item.y >= 800) {
      item.y = -300;
      item.style.left = Math.floor(Math.random() * 350) + "px";
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

function endGame(){
    player.start = false
    startScreen.classList.remove('hide')
}