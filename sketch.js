let plane1, origin, ps, ps1, prevH, ring, p, score, lamaine;
let w;
let xoff = 0;
let zoff = 0;
let trail = [];
let saturation = 100;
let materialColor = 210;
let font;


function preload(){
  font = loadFont('OpenSans-Regular.ttf');
  lamaine = loadImage('lamaine.jpg');

}

function setup() {
  createCanvas(600,600,WEBGL);
  colorMode(HSB,360,100,100,255);
  plane1 = new Plane();
  origin = plane1.pos.copy();
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
  push();
  textSize(36);
  textFont(font);
  fill(0);
  text(score, -270, -250);
  pop();
  score = ring.score;
  //pointLight(60,100,100, 0,300, -800);
  ambientLight(0,0,360);
  orbitControl();

  push();
  noStroke();
  ambientMaterial(40,40,100);
  //texture(lamaine);
  translate(0,0, -1200);
  sphere(200);
  //plane(500,900);
  pop();


  //text(score);
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
    plane1.acc.x += 0.18;
    plane1.bankAngleZ += 1.8;
  }else if(keyIsDown('65')){
    plane1.acc.x -= 0.18;
    plane1.bankAngleZ -= 1.8;
  } if(keyIsDown('83')) {
    plane1.acc.y -= 0.15;
    plane1.bankAngleX -= 1.5;
  } else if(keyIsDown('87')) {
    plane1.acc.y += 0.15;
    plane1.bankAngleX += 1.5;
  } else if(plane1.bankAngleZ > 0 || plane1.bankAngleZ < 0){
    plane1.bankAngleZ *= 0.95;
  } if(plane1.bankAngleX > 0 || plane1.bankAngleX < 0){
    plane1.bankAngleX *= 0.95;
  }
  push();
  plane1.update();
  plane1.render();

  //trail.run(plane.pos);

  ps.addParticle(2)
  ps.run();
  ps1.addParticle(2)
  ps1.run();
  pop();


  ring.update(plane1);
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
