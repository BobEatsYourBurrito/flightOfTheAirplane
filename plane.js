class Plane {
  constructor() {
    this.pos = createVector(0,100,100);
    this.vel = createVector();
    this.acc = createVector();
    this.maxSpeed = 4;
    this.bankAngleZ = 0;
    this.bankAngleX = 0;
  }
  update(origin) {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.vel.limit(this.maxSpeed);
    this.acc.mult(0);
    this.vel.mult(0.95);

  }
  render() {
    stroke(0);
    ambientMaterial(255);
    translate(this.pos.x, this.pos.y,this.pos.z);
    beginShape();
    rotateX(radians(this.bankAngleX));
    rotateZ(radians(this.bankAngleZ));
    vertex(0,0,0);
    vertex(20,0,50);
    vertex(- 20,0,50);
    vertex(0,0,0);
    vertex(0,10,50);
    vertex(0,0,50);
    endShape();
  }
}
