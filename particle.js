class Particle {
  constructor(origin) {
    this.pos = origin.copy();
    this.vel = createVector(0, 0, 0);
    this.acc = createVector();
    this.lifespan = 255;
    this.heat = random(200, 255);
    //this.gravity = createVector(0, 0.25, 0);
  }

  render() {
    push()
    translate(this.pos);
    noStroke();
    fill(0,0,100, this.lifespan);
    sphere(2);
    pop();
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.lifespan -= 15;
    this.heat -= 3

    this.acc.add(this.gravity);
  }

  isDead() {
    if(this.lifespan < 0) {
      return true;
    } else {return false}
  }

  applyForce(force) {
    this.acc.add(force)
  }
}
