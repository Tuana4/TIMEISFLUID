let bg; // Background image
let inkParticles = [];

function preload() {
    bg = loadImage("ink.png"); // Load background image
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(bg); // Set the background
}

function draw() {
    background(bg, 10); // Light overlay to keep trails

    for (let i = inkParticles.length - 1; i >= 0; i--) {
        inkParticles[i].update();
        inkParticles[i].display();

        if (inkParticles[i].alpha <= 0) {
            inkParticles.splice(i, 1); // Remove faded particles
        }
    }
}

// Ink effect when mouse moves
function mouseMoved() {
    let speed = dist(mouseX, mouseY, pmouseX, pmouseY); // Detect speed
    let numParticles = map(speed, 0, 50, 3, 15); // Faster movement = more ink

    for (let i = 0; i < numParticles; i++) {
        inkParticles.push(new InkParticle(mouseX, mouseY, speed));
    }
}

// Ink particle class
class InkParticle {
    constructor(x, y, speed) {
        this.x = x + random(-5, 5);
        this.y = y + random(-5, 5);
        this.vx = random(-1, 1) * (speed / 10); // Faster movement = more spread
        this.vy = random(1, 3) + (speed / 20); // More drip with speed
        this.size = random(10, 30) * (speed / 10); // Bigger ink splashes
        this.alpha = 255;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 2;
    }

    display() {
        noStroke();
        
        // **Glowing effect**
        fill(255, 255, 255, this.alpha * 0.3); // Soft glow
        ellipse(this.x, this.y, this.size * 1.5);
        
        // **Main ink**
        fill(255, this.alpha); // White ink
        ellipse(this.x, this.y, this.size);
    }
}

// Resize canvas when window size changes
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(bg);
}
