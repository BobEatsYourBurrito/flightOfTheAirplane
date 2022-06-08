let plane, origin, ps, ps1, prevH, ring, p, score;
let w;
let xoff = 0;
let zoff = 0;
let trail = [];
let saturation = 100;
let materialColor = 210;

function preload(){}

function setup() {
  createCanvas(600,600,WEBGL);
  colorMode(HSB,360,100,100,255);
  plane = new Plane();
  origin = plane.pos.copy();
  origin.y -= 100;
  origin.z -= 45;
  origin.x -= 20;
  ps = new ParticleSystem(origin);
  origin.x += 40;
  ps1 = new ParticleSystem(origin);
  w = 35;
  ring = new Ring();

}


function draw() {
  background(180,70,100);
  score = ring.score;
  orbitControl();
  ambientLight(0,0,360);
  push();
  noStroke();
  ambientMaterial(40,100,100);
  translate(0,0, -1200);
  sphere(100);
  pop();

  text(score);
  rotateX(radians(-10))
  for(let z = 200; z > -700; z-= 35){
    let waveStrength = map(z, 200, -500, 2,3)
    for(let x = -width / 1.5 ;x < width / 1.5; x+= 35){
      push();
      let d = dist(0, 300, x,z);
      let maxH = map(d,0,300,100,120)
      let offset = map(d, 0, 200, waveStrength, -waveStrength);
      // let h = map(sin(-xoff + zoff),-1,1,20,100);
      let h = floor(map(sin(-xoff + offset /2),-1,1,25,maxH));
      let b = floor(map(noise(-xoff + offset * 2),-1,1,25,100));
      let b1 = floor(map(noise(-xoff + offset * 2 + 100),-1,1,25,100));
      let darkness = map(h,25, 100,70,100);
      //White Wave Crashing WIP
      // if(h <= 140 && h >= 100) {
      //   saturation = 0;
      // }else{
      //   saturation = 100;
      // }
      // if(z > 100) {
      //   h = 100;
      //   materialColor = 40;
      // } else {materialColor = 210}

      ambientMaterial(materialColor,saturation,darkness);
      translate(x,250,z - 50);
      box(w,(h - b + b1),w);
      prevH = h;
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
  push();
  plane.update();
  plane.render();

  //trail.run(plane.pos);

  ps.addParticle(2)
  ps.run();
  ps1.addParticle(2)
  ps1.run();
  pop();


  ring.update(plane);
  ring.render();

}

// function linearGradientColor() {
//   let gradient = drawingContext.createLinearGradient(0,0,0,300);
//
//   gradient.addColorStop(0,0,100,100,255);
//   gradient.addColorStop(1,40,100,100,255);
//
//   drawingContext.fillStyle = gradient;
// }
