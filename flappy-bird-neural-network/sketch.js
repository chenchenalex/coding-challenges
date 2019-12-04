const birds = [];
const TOTAL = 100;
let pipes = [];

function setup() {
  createCanvas(400, 500);

  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }

  pipes.push(new Pipe());
}

function draw() {
  background(0);

  // to prevent removing the next item in array, it is better to loop backwards
  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    // if (pipes[i].hit(bird)) {
    //   console.log("hit");
    // }

    if (pipes[i].offScreen()) {
      pipes.splice(i, 1);
    }
  }

  birds.forEach(bird => {
    bird.think(pipes);
    bird.show();
    bird.update();
  });

  if (frameCount % 80 === 0) {
    pipes.push(new Pipe());
  }
}

// function keyPressed() {
//   if (key === " ") {
//     bird.up();
//   }
// }
