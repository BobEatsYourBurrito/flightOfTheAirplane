let plane, origin;
let w;
let xoff = 0;
let zoff = 0;
let trail = [];

function setup() {
  createCanvas(600,600,WEBGL);
  plane = new Plane();
  origin = plane.pos.copy();
  for(let i = 0; i < 100; i++){
    trail.push(new Particle(origin));
  }
  w = 25;

}


function draw() {
  background(175);
  ambientLight(255,255,255);
  rotateX(radians(-10))
  for(let z = 200; z > -500; z-= 25){
    for(let x = -width / 2 ;x < width / 2; x+= 25){
      ambientMaterial(20,255,100);
      push();

      let d = dist(0, 500, x,z);
      let offset = map(d, 0, 200, 2.5 , -2.5);
      // let h = map(sin(-xoff + zoff),-1,1,20,100);
      let h = floor(map(sin(-xoff + offset),-1,1,25,150));
      translate(x,250,z);
      box(w,h,w);
      pop();
    }

  }
  xoff += 0.1;


  if(keyIsDown('68')){
    plane.acc.x += 0.18;
    plane.bankAngle += 1.8;
  }
  if(keyIsDown('65')){
    plane.acc.x -= 0.18;
    plane.bankAngle -= 1.8;
  }
  if(plane.bankAngle > 0 || plane.bankAngle < 0){
    plane.bankAngle *= 0.99;
  }
  plane.update();
  plane.render();
  //trail.run(plane.pos);
  for(let i = 0; i < trail.length; i++){
    trail[i].update();
    trail[i].render();
    if(trail[i].lifeSpan < 0){
      trail.splice()
    }
  }


}
