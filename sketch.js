let plane1,
  origin,
  ps,
  ps1,
  prevH,
  ring,
  p,
  score,
  lamaine,
  waveWidth,
  skyBox,
  hotStreak,
  spawn,
  povPosition,
  cameraRotationsX,
  cameraRotationsZ,
  waveDistance,
  showControls,
  cameraMvntSpdX,
  cameraMvntSpdY;
let w;
let xoff = 0;
let waveInc = 0;
let trail = [];
let saturation = 100;
let materialColor = 210;
let font;
let planeHitWater = 0;
let usedRotation = 0;
let cameraX, cameraY, cameraZ;

function preload() {
  font = loadFont("OpenSans-Regular.ttf");
  //lamaine = loadImage("wilison.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 360, 100, 100, 255);
  plane1 = new Plane();
  //spawn = createVector(0,100,100);
  origin = plane1.pos.copy();
  origin.y -= 100;
  origin.z -= 0;
  origin.x -= 20;
  ps = new ParticleSystem(origin);
  origin.x += 40;
  ps1 = new ParticleSystem(origin);
  w = 35;
  ring = new Ring();
  waveWidth = 500;
  skyBox = new SkyBox(3000);
  noiseDetail(8);

  callCameraSetup();
}

function draw() {
  background(200, 70, 100);
  updateCamera();
  //console.log(cameraX,cameraY,cameraZ);
  translate(cameraX, cameraY, cameraZ);

  skyBox.render();

  //pointLight(60,100,100, 0,300, -800);
  ambientLight(0, 0, 360);

  rotateX(radians(cameraRotationsX));
  rotateZ(radians(cameraRotationsZ));

  //HighScore counter
  push();
  textSize(40);
  textFont(font);
  fill(0, 100, 0);
  translate(width / 2 - 300, -height + height / 2.5, -1000);
  text("Your HighScore and HotScore", 0, 0);
  textSize(60);
  fill(180, 100, 100);
  text(ring.highScore, 175, 75);
  text(ring.recordHotStreak, 420, 75);
  pop();

  //Instructions || controls
  if (showControls == 1) {
    push();
    translate(-width + 50, -height + height / 5, -1400);
    textSize(50);
    textFont(font);
    fill(0);
    text("Controls:", 0, 0);
    textSize(40);
    translate(0, 50, 0);
    text("WASD for normal movement", 0, 0);
    text("Q & E for Rotational Movement", 0, 40);
    text("To reset the page press Ctrl + R", 0, 80);
    text("To look around the scene use your MOUSE buttons", 0, 120);
    text("Use R to switch into diffent point of views", 0, 160);
    text("Press C to hide and show the controls", 0, 200);
    pop();
  }

  //point Counter
  push();
  translate(200, 0, -1000);
  textSize(50);
  textFont(font);
  fill(0);
  score = ring.score;
  text(score, 0, 0);
  translate(-50, -100, 0);
  text("Score", 0, 0);
  pop();

  //hotStreakCounter
  push();
  textSize(50);
  textFont(font);
  fill(0);
  translate(-400, -100, -1000);
  text("HotStreaks", 0, 0);
  hotStreak = ring.hotStreak;
  translate(150, 100, 0);
  text(hotStreak, 0, 0);
  pop();

  //orbitControl();

  push();
  noStroke();
  ambientMaterial(40, 40, 100);
  //texture(lamaine);
  translate(0, 0, -1200);
  sphere(200);
  //plane(500, 900);
  pop();

  //text(score);

  rotateY(radians(-cameraRotationsZ * 0.006));

  for (let z = waveDistance + 200; z > waveDistance - 700; z -= 35) {
    let waveStrength = map(z, 200, -500, 2, 3);

    for (let x = -waveWidth; x < waveWidth; x += 35) {
      push();
      let d = dist(map(noise(waveInc), -1, 1, -150, 150), 350, x, z);
      let maxH = map(d, 0, 300, 100, 120);
      let offset = map(d, 0, 200, waveStrength, -waveStrength);
      // let h = map(sin(-xoff + zoff),-1,1,20,100);
      let h = floor(map(sin(-xoff + offset / 2), -1, 1, 25, maxH));
      let b = floor(map(noise(-xoff + offset * 2), -1, 1, 25, 100));
      let b1 = floor(map(noise(-xoff + offset * 2 + 100), -1, 1, 25, 100));
      let darkness = map(h, 25, 100, 70, 100);

      //White Wave Crashing WIP

      if (h >= 120) {
        saturation = 0;
      } else {
        saturation = 100;
      }
      // if(z > 100) {
      //   h = 100;
      //   materialColor = 40;
      // } else {materialColor = 210}

      ambientLight(0, 0, 80);
      specularMaterial(materialColor, saturation, darkness);
      shininess(50);
      translate(x, 250, z - 50);
      box(w, h - b + b1, w);
      prevH = h;
      // console.log(h);
      pop();
    }
  }

  if (plane1.pos.y > 240) {
    planeHitWater = 1;
  }

  if (planeHitWater === 0) {
    xoff += 0.05;
    waveInc += 0.001;

    if (keyIsDown("68")) {
      plane1.acc.x += cameraMvntSpdX;
      plane1.bankAngleZ += 2.2;
      usedRotation = 0;
    } else if (keyIsDown("65")) {
      plane1.acc.x -= cameraMvntSpdX;
      plane1.bankAngleZ -= 2.2;
      usedRotation = 0;
    }
    if (keyIsDown("83")) {
      plane1.acc.y -= cameraMvntSpdY;
      plane1.bankAngleX -= 1.7;
    } else if (keyIsDown("87")) {
      plane1.acc.y += cameraMvntSpdY;
      plane1.bankAngleX += 1.7;
    }
    if (keyIsDown("69")) {
      plane1.bankAngleZ += 2.5;
      usedRotation = 1;
    } else if (keyIsDown("81")) {
      plane1.bankAngleZ -= 2.5;
      usedRotation = 1;
    }
    if (
      (plane1.bankAngleVelZ > 0 && usedRotation === 0) ||
      (plane1.bankAngleVelZ < 0 && usedRotation === 0)
    ) {
      plane1.bankAngleVelZ *= 0.95;
    } else {
      plane1.bankAngleVelZ *= 0.99;
    }
    if (plane1.bankAngleVelX > 0 || plane1.bankAngleVelX < 0) {
      plane1.bankAngleVelX *= 0.95;
    }

    plane1.update();

    if (!hidePlane) {
      push();

      plane1.render();

      // if(mouseIsPressed){
      // plane1.mouseInput();}
      //trail.run(plane.pos);

      ps.addParticle(2);
      ps.run();
      ps1.addParticle(2);
      ps1.run();
      pop();
    }

    ring.update(plane1);
    ring.render();
  } else if (planeHitWater == 1) {
    plane1.pos.y = -50;

    push();
    rotateX(radians(-cameraRotationsX / 2));
    rotateZ(radians(-cameraRotationsZ / 2));
    fill(180, 100, 100);
    translate(plane1.pos.x - 450, plane1.pos.y + 100, plane1.pos.z - 400);
    textFont(font);
    textSize(150);
    text("You Crashed!", 0, 0);
    textSize(40);
    fill(0, 100, 0);
    text("Press SPACE to try again!", 200, 50);
    pop();

    if (keyIsDown("32")) {
      plane1.vel.mult(0);
      plane1.update();
      plane1.render();
      ring.score = 0;
      planeHitWater -= 1;
      plane1.highScoreColorScroll = 0;
    }
  }
}

function keyReleased() {
  if (keyCode === 82) {
    povPosition++;
  }
  if (keyCode === 67 && showControls < 1) {
    showControls++;
  } else if (keyCode === 67) {
    showControls = 0;
  }
}

// function linearGradientColor() {
//   let gradient = drawingContext.createLinearGradient(0,0,0,300);
//
//   gradient.addColorStop(0,0,100,100,255);
//   gradient.addColorStop(1,40,100,100,255);
//
//   drawingContext.fillStyle = gradient;
// }
