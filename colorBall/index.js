// create 2d canvas
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

// set the witdh and height of the canvas
const WIDTH = canvas.width = window.innerWidth;
const HEIGHT = canvas.height = window.innerHeight;


// create Ball
function Ball(x, y, speedX, speedY, color, size) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
    this.size = size;
}

Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

Ball.prototype.update = function () {
    const { x, y, size, speedX, speedY } = this;
    switch (true) {
        case x + size >= WIDTH:
        case x - size <= 0:
            this.speedX = -speedX;
            break;
        case y + size >= HEIGHT:
        case y - size <= 0:
            this.speedY = -speedY;
            break;
    }
    this.x += this.speedX;
    this.y += this.speedY;
}

Ball.prototype.collisionDetect = function () {
    // 由于疏忽将加号写成了逗号，导致只传入了x的平方，造成distance距离变小，从而让小球在没有接触就变色的bug
    // const distance = Math.sqrt(Math.pow(dX, 2), Math.pow(dY, 2));
    balls.forEach(item => {
        if (this !== item) {
            const dX = this.x - item.x;
            const dY = this.y - item.y;
            const distance = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
            if (distance <= this.size + item.size) {
                this.color = randomColor();
                item.color = randomColor();
            }
        }
    })
}

function createBall(total) {
    if (total === 0) return null;
    const balls = [];
    while (balls.length < total) {
        const size = random(10, 20);
        let ball = new Ball(
            random(size, WIDTH - size),
            random(size, HEIGHT - size),
            random(-5, 5),
            random(-5, 5),
            randomColor(),
            size
        );
        balls.push(ball);
    }
    return balls;
}

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    balls.forEach(item => {
        item.draw();
        item.update();
        item.collisionDetect();
    });
    requestAnimationFrame(loop);
}

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

function randomColor() {
    const color = `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`
    return color;
}

const balls = createBall(10);
loop();
