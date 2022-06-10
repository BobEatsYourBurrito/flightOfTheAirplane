class Ring {
  constructor() {
    this.randomX = 200;
    this.pos = createVector(random(-this.randomX,this.randomX), -120,-800);
    this.vel = createVector(0,0, 5);
    this.score = 0;
    this.pointCheck = 0;
  }
  update(plane){
    this.pos.add(this.vel);

    if(this.pos.z > 600){
      this.pos = createVector(random(-this.randomX,this.randomX),random(-75, -200),-1500);

      this.pointCheck = 0;
      this.vel.z += 0.1;
    }

    if(this.pos.dist(plane.pos) < 30 && this.pointCheck === 0){
      this.score ++;
      this.pointCheck ++;
    }
    // console.log(this.score);
  }
  render(){
    push();
    noStroke();
    translate(this.pos)
    //ambientMaterial(140,100,70);
    fill(140,100,70);
    torus(50, 10);
    pop();
  }
}
