const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const groundImg = new Image();
const foodImg = new Image();

let speed = prompt("Скорость змейки в милисекундах.")
document.addEventListener("keydown", onKeyDown);

groundImg.src = "img/match.png";
foodImg.src = "img/carrot.png";

let dir;
let box = 32;
let score = 0;
let food = {
    x: Math.floor((Math.random() * 17) + 1) * box,
    y: Math.floor((Math.random() * 14) + 3) * box,
};
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

function foodPosition() {
    food = {
        x: Math.floor((Math.random() * 17) + 1) * box,
        y: Math.floor((Math.random() * 14) + 3) * box,
    };
}

function onKeyDown(e) {
    switch(e.keyCode) {
        case 37:
            if (dir == "right") {
                break;
            }
            dir = "left";
            break;
        case 38:
            if (dir == "down") {
                break;
            }
            dir = "up";
            break;
        case 39:
            if (dir == "left") {
                break;
            }
            dir = "right";
            break;
        case 40:
            if (dir == "up") {
                break;
            }
            dir = "down";
            break;
    }
    console.log(dir);
    console.log(e.keyCode);
}

function draw() {
    ctx.drawImage(groundImg, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "green" : "red";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box * 1.7)
}

function drawGame() {
    
    draw();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    switch(dir) {
        case "left":
            snakeX -= box;
            break;
        case "right":
            snakeX += box;
            break;
        case "up":
            snakeY -= box;
            break;
        case "down":
            snakeY += box;
            break;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    snake.unshift(newHead);

    if(newHead.x == food.x && newHead.y == food.y) {
        score++;
        foodPosition();
        console.log("yes");
    }
    else {
        snake.pop();
    }
}

console.log(food.x, food.y);

setInterval(drawGame, speed);