class SkyBox{
  constuctor(z){
    this.color0 = color(180,100,100);
    this.color1 = color(180, 70, 100);
    this.z = z;
  }
  render(){
    beginShape();
    fill(20, 100, 1000);
    vertex(-2500,2500,-1500);
    fill(20, 100, 100);
    vertex(2500,2500,-1500);
    fill(220, 100, 100);
    vertex(2500,-2500,-1500);
    fill(220, 100, 100);
    vertex(-2500,-2500,-1500);
    endShape();
  }

  timeChange(){
  sunDial += 0.05;
  sunDial180 += 0.05;
  //  this.color = color(sunDial, 100, 100);
    if(sunDial > 360){sunDial = 0}
    if(sunDial180 > 360){sunDial180 = 0}
    if(sunDial < 370) {
      push();
      //colorMode(RGB);
      let r = abs(map(map(sunDial180, 0, 360, -1, 1), -1, 1, -100, 100)),
	 g = abs(map(map(sunDial,0, 360, -1, 1), -1, 1, -255, 255)),
	 b = abs(map(map(sunDial,0, 360, -1, 1), -1, 1, -255, 255));
      this.color0 = color(r, 0, b);
      this.color1 = color(r, 0, b);
      pop();
      }
   }
}
