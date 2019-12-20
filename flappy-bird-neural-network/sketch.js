const birds = [];
const TOTAL = 500;
let cycle = 100;
let savedBirds = [];
let counter = 0;
let pipes = [];
let slider;

function keyPressed() {
  if (key === "s") {
    let json = birds[0].brain.serialize();
    save(json, "bird.json");
  }
}

function setup() {
  createCanvas(400, 500);
  slider = createSlider(1, 100, 1);

  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }

  pipes.push(new Pipe());
}

function draw() {
  // to prevent removing the next item in array, it is better to loop backwards
  for (let c = 0; c < slider.value(); c++) {
    if (counter % 80 === 0) {
      pipes.push(new Pipe());
    }
    counter++;

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();

      for (let j = birds.length - 1; j >= 0; j--) {
        if (pipes[i].hit(birds[j])) {
          savedBirds = savedBirds.concat(birds.splice(j, 1));
        }
      }

      if (pipes[i].offScreen()) {
        pipes.splice(i, 1);
      }
    }

    birds.forEach(bird => {
      bird.think(pipes);
      bird.show();
      bird.update();
    });

    if (birds.length === 0) {
      counter = 0;
      newGeneration();
      pipes = [];
    }
  }

  background(0);

  pipes.forEach(pipe => pipe.show());
  birds.forEach(bird => bird.show());
}
