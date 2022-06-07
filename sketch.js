let plane, origin, ps;
let w;
let xoff = 0;
let zoff = 0;
let trail = [];

function setup() {
  createCanvas(600,600,WEBGL);
  plane = new Plane();
  origin = plane.pos.copy();
  origin.y -= 100;
  origin.z -= 45;
  ps = new ParticleSystem(origin);
  w = 35;

}


function draw() {
  background(0,200,255);
  orbitControl();
  ambientLight(255,255,255);
  push();
  noStroke();
  ambientMaterial(255,200,0,255);
  translate(0,-70, -1200);
  sphere(100);
  pop();
  rotateX(radians(-20))
  for(let z = 200; z > -700; z-= 35){
    for(let x = -width / 1.5 ;x < width / 1.5; x+= 35){
      var r = random(1,2);
      if(r === 2){
        ambientMaterial(255);
      } else {ambientMaterial(0,150,250)}
      push();
      let d = dist(0, 500, x,z);
      let offset = map(d, 0, 200, 3.2 , -3.2);
      // let h = map(sin(-xoff + zoff),-1,1,20,100);
      let h = floor(map(sin(-xoff + offset /2),-1,1,25,100));
      let b = floor(map(noise(-xoff + offset * 2),-1,1,25,100));
      let b1 = floor(map(noise(-xoff + offset * 2 + 100),-1,1,25,100));
      translate(x,250,z - 50);
      box(w,h + b - b1,w);
      pop();
    }

  }
  xoff += 0.05;


  if(keyIsDown('68')){
    plane.acc.x += 0.18;
    plane.bankAngleZ += 1.8;
  }else if(keyIsDown('65')){
    plane.acc.x -= 0.18;
    plane.bankAngleZ -= 1.8;
  } if(keyIsDown('83')) {
    plane.acc.y -= 0.15;
    plane.bankAngleX -= 1.5;
  } else if(keyIsDown('87')) {
    plane.acc.y += 0.15;
    plane.bankAngleX += 1.5;
  } else if(plane.bankAngleZ > 0 || plane.bankAngleZ < 0){
    plane.bankAngleZ *= 0.95;
  } if(plane.bankAngleX > 0 || plane.bankAngleX < 0){
    plane.bankAngleX *= 0.95;
  }
  plane.update();
  plane.render();
  //trail.run(plane.pos);

  ps.addParticle(2)
  ps.run();





}
