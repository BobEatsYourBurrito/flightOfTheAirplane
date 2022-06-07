class Particle {
  constructor(origin){
    this.pos = origin;
    this.vel = createVector(0,0,2);
    this.acc = createVector();
    this.lifeSpan = 255;
  }
  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.vel.limit(5);
    this.acc.mult(0);
    this.lifeSpan -= 2;

  }
  render(){
    push();
    noStroke();
    fill(255,100, 0, this.lifeSpan);
    translate(this.pos.x,this.pos.y - 100,this.pos.z + 50);
    sphere(2);
    pop();
  }
  applyForce(force){
    this.acc.add(force);
  }
}
