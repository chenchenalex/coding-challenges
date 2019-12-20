function newGeneration() {
  console.log("newGeneration");

  calculateFitness(savedBirds);

  for (let i = 0; i < TOTAL; i++) {
    birds.push(pickOne());
  }

  savedBirds = [];
}

function pickOne() {
  var index = 0;
  var r = random(1);

  // pick one item from the list based on probability
  while (r > 0) {
    r = r - savedBirds[index].fitness;
    index++;
  }

  index--;

  let bird = savedBirds[index];

  let child = new Bird(bird.brain);

  child.mutate(0.1);
  return child;
}

function calculateFitness(birdList) {
  let sum = birdList.reduce((acc, bird) => {
    return (acc += bird.score);
  }, 0);

  for (bird of birdList) {
    bird.fitness = bird.score / sum;
  }
}
