class SkyBox{
  constuctor(z){
    this.color0 = color(300,100,100);
    this.color1 = color(40, 70, 100);
    this.z = z;
  }
  render(){
    beginShape();
    fill(40, 100, 100);
    vertex(-2500,2500,-1500);
    fill(40, 100, 100);
    vertex(2500,2500,-1500);
    fill(320,100,100);
    vertex(2500,-2500,-1500);
    fill(320,100,100);
    vertex(-2500,-2500,-1500);
    endShape();
  }
}
