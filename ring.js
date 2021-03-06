class Ring {
  constructor() {
    this.randomX = 200;
    this.pos = createVector(random(-this.randomX, this.randomX), -120, -800);
    this.vel = createVector(0, 0, 5);
    this.score = 0;
    this.pointCheck = 0;
    this.hotStreak = 0;
    this.acc = 0.05;
    this.highScore = getItem("this.highScore");
    if (this.highScore === null) {
      this.highScore = 0;
    }
    this.recordHotStreak = getItem("this.recordHotStreak");
    if (this.recordHotStreak === null) {
      this.recordHotStreak = 0;
    }
  }
  update(plane) {
    this.pos.add(this.vel);
    this.vel.limit(12);
    if (this.pos.z > 600) {
      this.pos = createVector(
        random(-this.randomX, this.randomX),
        random(-75, -200),
        -1500
      );
      if (this.pointCheck == 0) {
        this.hotStreak = 0;
      } else if (this.pointCheck == 1) {
        this.pointCheck = 0;
        this.acc += 0.05;
        this.vel.z += this.acc;
      }
    }

    //difference between ring center and plane1 one x and y axis
    let distInX = sqrt(
      (this.pos.x - plane1.pos.x) * (this.pos.x - plane1.pos.x)
    );
    let distInY = sqrt(
      (this.pos.y - plane1.pos.y) * (this.pos.y - plane1.pos.y)
    );
    let distInZ = sqrt(
      (this.pos.z - plane1.pos.z) * (this.pos.z - plane1.pos.z)
    );

    // console.log(distInX, distInY, distInZ);
    if (distInY < 45 && distInX < 45 && distInZ < 5 && this.pointCheck === 0) {
      this.score++;
      this.hotStreak += 1;
      this.pointCheck++;
    }
    if (this.score > this.highScore) {
      this.highScore = this.score;
      storeItem("this.highScore", this.highScore);
      plane1.highScoreColorScroll = 100;
    }

    if (this.hotStreak > this.recordHotStreak) {
      this.recordHotStreak = this.hotStreak;
      storeItem("this.recordHotStreak", this.recordHotStreak);
    }
    // console.log(this.hotStreak);
  }
  render() {
    push();
    noStroke();
    translate(this.pos);
    //ambientMaterial(180, 100, 70);
    fill(180, 100, 80);
    torus(50, 10);
    pop();
  }
}
