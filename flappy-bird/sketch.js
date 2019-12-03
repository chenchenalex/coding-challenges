let bird;
let pipes = [];

function setup() {
  createCanvas(400, 500);
  bird = new Bird();

  pipes.push(new Pipe());
}

function draw() {
  // to prevent removing the next item in array, it is better to loop backwards
  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hit(bird)) {
      console.log("hit");
    }

    if (pipes[i].offScreen()) {
      pipes.splice(i, 1);
    }
  }

  background(0);
  bird.show();
  bird.update();

  if (frameCount % 80 === 0) {
    pipes.push(new Pipe());
  }
}

function keyPressed() {
  if (key === " ") {
    bird.up();
  }
}
