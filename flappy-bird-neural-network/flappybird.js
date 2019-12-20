class Bird {
  constructor(brain) {
    this.y = height / 2;
    this.x = 40;
    this.gravity = 1;
    this.velocity = 0;
    this.radius = 16;

    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(5, 8, 1);
    }
    this.score = 0;
  }

  show() {
    stroke(255);
    fill(255, 50);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }
  up() {
    this.velocity -= this.gravity * 16;
  }

  mutate(rate) {
    this.brain.mutate(rate);
  }

  think(pipes) {
    // get closest pipes
    let closest = null;
    let closestD = Infinity;

    for (let i = 0; i < pipes.length; i++) {
      let distance = pipes[i].x + pipes[i].w - this.x;

      if (distance < closestD && distance > 0) {
        closestD = distance;
        closest = pipes[i];
      }
    }

    let inputs = [];

    inputs[0] = this.y / height;
    inputs[1] = closest.top / height;
    inputs[2] = closest.bottom / height;
    inputs[3] = closest.x / width;
    inputs[4] = this.velocity / 10;

    let output;
    output = this.brain.predict(inputs);

    if (output[0] > 0.5) {
      this.up();
    }
  }

  update() {
    this.score++;
    this.y += this.velocity;

    if (this.y >= height - this.radius) {
      this.y = height - this.radius;
      this.velocity = 0;
      return;
    }

    if (this.y < this.radius) {
      this.y = this.radius;
      this.velocity = 0;
      return;
    }

    this.velocity += this.gravity;
  }
}
