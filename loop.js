// We can access the canvas by the id we set ("view")
let canvas = document.getElementById("view");

// The actual HTML element object doesn't provide a means to draw onto it.
// We must ask it to give us a graphics "context", and in our case, a 2d context
// so we can draw.
let ctx = canvas.getContext("2d");

let player = {
    // Position
    x: 0,
    y: 0,

    // Velocity
    dx: 0,
    dy: 0
};

// Our input code from above
let input = {
    left: false,
    right: false,
    jump: false
};

// A little helper so we don't have to repeat the code
// inside the keydown and keyup listeners
function setKeyState(key, down) {
    if(key == "ArrowLeft") { // left arrow key
        input.left = down;
    } else if(key == "ArrowRight") { // right arrow key
        input.right = down;
    } else if(key == " ") { // spacebar
        input.jump = down;
    }
}

window.addEventListener("keydown", function(e) {
    setKeyState(e.key, true);
});

window.addEventListener("keyup", function(e) {
    setKeyState(e.key, false);
});

function processInput() {
    if(input.left) {
        player.dx = -5;
    } else if(input.right) {
        player.dx = 5;
    } else {
        player.dx = 0;
    }
}

function update() {
    player.x += player.dx;
    player.y += player.dy;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Let's draw a filled rectangle (32x32) that's red
    ctx.fillStyle = "red";

    ctx.fillRect(player.x, player.y, 32, 32);
}

function loop() {
    if(areAllAssetsLoaded()) {
        processInput();
        update();
        draw();    
    }
    
    requestAnimationFrame(loop);
}

loop();