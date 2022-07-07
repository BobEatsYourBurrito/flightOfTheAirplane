class Plane {
  constructor() {
    this.pos = createVector(0, 100, 50);
    this.vel = createVector();
    this.acc = createVector();
    this.maxSpeed = 4;
    this.bankAngleZ = 0;
    this.bankAngleX = 0;
    this.propSpeed = 0;
    let color = 0;
    this.highScoreColorScroll = 0;
  }
  update(origin) {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.vel.limit(this.maxSpeed);
    this.acc.mult(0);
    this.vel.mult(0.95);
    this.propSpeed += 1;
    constrain(this.pos.x, -width / 2, width / 2);
  }
  render() {
    stroke(0);
    ambientMaterial(map(color, 0, 100, 0, 360), this.highScoreColorScroll, 100);
    let constrainedXPos = constrain(
      this.pos.x,
      -windowWidth / 5,
      windowWidth / 5.5
    );
    let constrainedYPos = constrain(
      this.pos.y,
      -windowHeight / 4,
      windowHeight / 2
    );
    translate(constrainedXPos, constrainedYPos, this.pos.z);
    //console.log(constrainedYPos);
    this.pos.x = constrainedXPos;
    this.pos.y = constrainedYPos;
    push();
    strokeWeight(2);
    rotateZ(this.propSpeed);
    line(0, 0 - 10, 0, 0 + 10);
    pop();

    beginShape();
    rotateX(radians(this.bankAngleX));
    rotateZ(radians(this.bankAngleZ));
    vertex(0, 0, 0);
    vertex(20, 0, 50);
    vertex(-20, 0, 50);
    vertex(0, 0, 0);
    vertex(0, 10, 50);
    vertex(0, 0, 50);
    endShape();
    if (color <= 100) {
      color += 0.5;
    } else {
      color = 0;
    }
  }
}
