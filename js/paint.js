var
    canvas = document.getElementById("canvas"); //Сосём канвас
    ctx = canvas.getContext("2d"); //Выставляем контекст
    isMouseDown = false; //Проверка на нажатие мыши
    points = []; //Массив координат линий

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.lineWidth = 10 * 2;

//ShitCode

//Событие на нажатие мышки
canvas.addEventListener('mousedown', function() {
    isMouseDown = true;
    console.log("down");
});

//Событие на НЕнажатие мышки
canvas.addEventListener('mouseup', function() {
    isMouseDown = false;
    ctx.beginPath();
    points.push("mouseup");
    console.log("up");
});

//Событие на движение мыши
canvas.addEventListener('mousemove', function(e) {
    if (isMouseDown == true) {
        points.push([e.clientX, e.clientY]);
        drawLine(e);
    }
});

//Событие на нажатие кнопок
document.addEventListener("keydown", function(e) {
    switch(e.keyCode) {
        case 83:
            save();
            break;
        case 82:
            replay();
            break;
        case 67:
            clear();
            break;
    }
});

//Просто рисует точку
function drawLine(e) {
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(e.clientX, e.clientY, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
}

//Сохраняет всё ето говно в локальный JSON файл
function save() {
    localStorage.setItem('points', JSON.stringify(points));
    console.log("Saved!");
}

//Воспроизводит
function replay() {
    speed = prompt("Скорость воспроизведения в милисекундах.");
    if (speed.replace(/\s/g, '').length === 0 || isNaN(speed)) {
        alert('Нужно писать число!');
        return;
    }
    points = JSON.parse(localStorage.getItem("points"));
    timer = setInterval(function() {
        if (!points.length) {
            clearInterval(timer);
            ctx.beginPath();
            return;
        }

        crd = points.shift(),
        e = {
            clientX: crd[0],
            clientY: crd[1]
        };

        drawLine(e);

    }, speed);
    clear();
    console.log("Replaying!");
    
}

//Чисти говно чисти...
function clear() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    console.log("Context was Clear!");
}