class Ring {
  constructor() {
    this.randomX = 200;
    this.pos = createVector(random(-this.randomX,this.randomX), -120,-800);
    this.vel = createVector(0,0, 5 );
    this.score = 0;
    this.pointCheck = 0;
    this.hotStreak = 0;
    this.acc = 0.05;
    this.highScore = getItem('this.highScore');
    if(this.highScore === null){
      this.highScore = 0;}
    this.recordHotStreak = getItem('this.recordHotStreak');
    if(this.recordHotStreak === null){
      this.recordHotStreak = 0;}

  }
  update(plane){
    this.pos.add(this.vel);
    this.vel.limit(16);
    if(this.pos.z > 600){
      this.pos = createVector(random(-this.randomX,this.randomX),random(-75, -200),-1500);
      if(this.pointCheck == 0) {
        this.hotStreak = 0;
      }else if (this.pointCheck == 1) {
      this.pointCheck = 0;
      this.acc += 0.025;
      this.vel.z += this.acc;
      }
    }

    if(this.pos.dist(plane.pos) < 30 && this.pointCheck === 0){
      this.score ++;
      this.hotStreak += 1;
      this.pointCheck ++;
    }
    if(this.score > this.highScore){
      this.highScore = this.score;
      storeItem('this.highScore', this.highScore);
    }

    if(this.hotStreak > this.recordHotStreak){
      this.recordHotStreak = this.hotStreak;
      storeItem('this.recordHotStreak', this.recordHotStreak);
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
