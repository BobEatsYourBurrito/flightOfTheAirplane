class Plane {
  constructor() {
    this.pos = createVector(0, 100, 50);
    this.vel = createVector();
    this.acc = createVector();
    this.maxSpeed = 4;
    this.bankAngleVelX = 0;
    this.bankAngleVelZ = 0;
    this.bankAngleVelShowZ = this.bankAngleVelZ / 1.05;
    this.bankAngleZ = 0;
    this.bankAngleX = 0;
    this.propSpeed = 0;
    this.velDampening = 0.95;
    this.color = 0;
    this.highScoreColorScroll = 0;
    this.customColor = 0;
    this.isNotDark = 100;
    this.isReceivingInput = 0;
  }
  update(origin) {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.vel.limit(this.maxSpeed);
    this.acc.mult(0);
    this.vel.mult(this.velDampening);
    this.propSpeed += 1;
    this.bankAngleVelX += this.bankAngleX;
    this.bankAngleVelZ += this.bankAngleZ;
    this.bankAngleX *= 0;
    this.bankAngleZ *= 0;

    constrain(this.pos.x, -width / 2, width / 2);
  }
  render() {
    stroke(0);
    ambientMaterial(
      map(this.color, 0, 100, 0, 360),
      this.customColor,
      this.isNotDark
    );
    let constrainedXPos = constrain(
      this.pos.x,
      -windowWidth / 4,
      windowWidth / 4
    );
    let constrainedYPos = constrain(
      this.pos.y,
      -windowHeight / 3,
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

    if (!hidePlane) {
      beginShape();
      rotateX(radians(this.bankAngleVelX));
      rotateZ(radians(this.bankAngleVelZ));
      vertex(0, 0, 0);
      vertex(20, 0, 50);
      vertex(-20, 0, 50);
      vertex(0, 0, 0);
      vertex(0, 10, 50);
      vertex(0, 0, 50);
      endShape();
    }
    if (plane1.highScoreColorScroll === 100) {
      this.color += 0.5;
    }
    if (this.color >= 100 && plane1.highScoreColorScroll === 100) {
      this.color = 0;
    }

    if (
      (this.bankAngleVelZ > 0 &&
        this.bankAngleVelZ < 180 &&
        this.isReceivingInput === 0) ||
      (this.bankAngleVelZ < 0 &&
        this.bankAngleVelZ > -180 &&
        this.isReceivingInput === 0)
    ) {
      this.bankAngleVelZ *= 0.95;
    } else if (this.bankAngleVelZ > 180 || this.bankAngleVelZ < -180) {
      this.bankAngleVelZ /= 0.99;
    }
    if (this.bankAngleVelZ > 359.9 || this.bankAngleVelZ < -359.9) {
      this.bankAngleVelZ = 0;
      this.vel.mult(2.5);
    }
    if (this.bankAngleVelX > 0 || this.bankAngleVelX < 0) {
      this.bankAngleVelX *= 0.965;
    }

    // if (keyIsDown("69") || keyIsDown("81")) {
    //   this.isReceivingInput = 1;
    // } else {
    //   this.isReceivingInput = 0;
    // }
    // if (
    //   (plane1.bankAngleVelZ > 0 && usedRotation === 0) ||
    //   (plane1.bankAngleVelZ < 0 && usedRotation === 0)
    // ) {
    //   plane1.bankAngleVelZ *= 0.95;
    // } else {
    //   plane1.bankAngleVelZ *= 0.99;
    // }
    // if (plane1.bankAngleVelX > 0 || plane1.bankAngleVelX < 0) {
    //   plane1.bankAngleVelX *= 0.95;
    // }
  }
}
