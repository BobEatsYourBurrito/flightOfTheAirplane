class Ring {
  constructor() {
    this.randomX = 200;
    this.pos = createVector(random(-this.randomX,this.randomX), -170,-800);
    this.vel = createVector(0,0, 5);
    this.score = 0;
    this.pointCheck = 0;
  }
  update(plane){
    this.pos.add(this.vel);

    if(this.pos.z > 300){
      this.pos.z = -1000;
      this.pos.x = random(-this.randomX,this.randomX);
      this.pointCheck = 0;
      this.vel.z += 0.1;
    }

    if(this.pos.dist(plane.pos) < 20 && this.pointCheck === 0){
      this.score ++;
      this.pointCheck ++;
    }
    console.log(this.score);
  }
  render(){
    push();
    noStroke();
    translate(this.pos)
    ambientMaterial(0,100,100);
    torus(50, 10);
    pop();
  }
}
