const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const paddleHeight = gridSize * 5;
let isPaused = true;
let ballSpeed = 5;
const paddleSpeed = 5;
const maxY = canvas.height - gridSize - paddleHeight;//max paddle height


const changeSpeed = document.getElementById('speed');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const label = document.getElementById('speed-value');

const paddles = [
    {
        x: gridSize * 2,
        y: canvas.height / 2 - paddleHeight / 2,
        width: gridSize,
        height: paddleHeight,
        dY: 0,
    },
    {
        x: canvas.width - gridSize * 3,
        y: canvas.height / 2 - paddleHeight / 2,
        width: gridSize,
        height: paddleHeight,
        dY: 0,
    },
];

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: gridSize,
    height: gridSize,
    dX: ballSpeed,
    dY: ballSpeed,
    resetBall: false,
};

//брал отсюда: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
function collides(obj1, obj2) {
    return obj1.x < obj2.x + obj2.width &&
           obj1.x + obj1.width > obj2.x &&
           obj1.y < obj2.y + obj2.height &&
           obj1.y + obj1.height > obj2.y;
}

//главная функция
function game() {
    requestAnimationFrame(game);
    if (!isPaused) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        paddles[0].y += paddles[0].dY;
        paddles[1].y += paddles[1].dY;

        //проверка на выход за стенки
        if (paddles[0].y < gridSize) paddles[0].y = gridSize;
        if (paddles[1].y < gridSize) paddles[1].y = gridSize;
        if (paddles[0].y > maxY) paddles[0].y = maxY;
        if (paddles[1].y > maxY) paddles[1].y = maxY;
        //для мяча меняем dY
        if (ball.y < gridSize) {
            ball.dY *= -1;
            ball.y = gridSize;
        }

        if (ball.y + gridSize > canvas.height - gridSize) {
            ball.y = canvas.height - gridSize * 2
            ball.dY *= -1;
        }

        ctx.fillStyle = 'white';
        ctx.fillRect(paddles[0].x, paddles[0].y, paddles[0].width, paddles[0].height);
        ctx.fillRect(paddles[1].x, paddles[1].y, paddles[1].width, paddles[1].height);

        //перезагрузка мячика если он вылетел за границы
        if ((ball.x < 0 || ball.x > canvas.width) && !ball.resetBall) {
            ball.resetBall = true;

            setTimeout(() => {
                ball.resetBall = false;
                ball.x = canvas.width / 2;
                ball.y = canvas.height / 2;
            }, 800);
        }


        if (collides(ball, paddles[0])) {
            ball.dX *= -1;
            ball.x = paddles[0].x + paddles[0].width;
        }

        if (collides(ball, paddles[1])) {
            ball.dX *= -1;
            ball.x = paddles[1].x -ball.width; 
        }

        ctx.fillStyle = "red";
        ctx.fillRect(ball.x, ball.y, ball.width, ball.height);

        ball.x += ball.dX;
        ball.y += ball.dY;

        ctx.fillStyle = 'lightgrey';
        ctx.fillRect(0, 0, canvas.width, gridSize);
        ctx.fillRect(0, canvas.height - gridSize, canvas.width, canvas.height);

        // draw dotted line down the middle
        for (let i = gridSize; i < canvas.height - gridSize; i += gridSize * 2) {
            ctx.fillRect(canvas.width / 2 - gridSize / 2, i, gridSize, gridSize);
        }  
    }  
}
document.addEventListener('keydown', (e) => {

    // code    Key
    // 38      up arrow
    // 40      down arrow
    // 87      w
    // 83      s

    if (e.which === 38) {
        paddles[1].dY = -paddleSpeed;
    } else if (e.which === 40) {
        paddles[1].dY = paddleSpeed;
    }

    if (e.which === 87) {
        paddles[0].dY = -paddleSpeed;
    } else if (e.which === 83) {
        paddles[0].dY = paddleSpeed;
    }

});

document.addEventListener('keyup', (e) => {
    if (e.which === 38 || e.which === 40) paddles[1].dY = 0;
    if (e.which === 87 || e.which === 83) paddles[0].dY = 0;
});


changeSpeed.addEventListener('click', (e) => {
    ballSpeed = e.target.value;
    ball.dX = +e.target.value;
    ball.dY = +e.target.value;
    label.innerText = e.target.value;
    console.log(e.target.value);
});

startBtn.addEventListener('click', () => {
    isPaused = false;
});

pauseBtn.addEventListener('click', () => {
    isPaused = true;
});

function initCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(paddles[0].x, paddles[0].y, paddles[0].width, paddles[0].height);
    ctx.fillRect(paddles[1].x, paddles[1].y, paddles[1].width, paddles[1].height);

    ctx.fillStyle = 'lightgrey';
    ctx.fillRect(0, 0, canvas.width, gridSize);
    ctx.fillRect(0, canvas.height - gridSize, canvas.width, canvas.height);
    for (let i = gridSize; i < canvas.height - gridSize; i += gridSize * 2) {
        ctx.fillRect(canvas.width / 2 - gridSize / 2, i, gridSize, gridSize);
    }  
    ctx.fillStyle = "red";

    ctx.fillRect(ball.x, ball.y, ball.width, ball.height);
}

initCanvas();
requestAnimationFrame(game);
