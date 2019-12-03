class Bird {
  constructor() {
    this.y = height / 2;
    this.x = 16;
    this.gravity = 1;
    this.velocity = 0;
    this.radius = 16;
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }
  up() {
    this.velocity -= this.gravity * 13;
  }

  update() {
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
