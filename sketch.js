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
  cameraMvntSpdY,
  airplaneNoisesInFlight,
  inGameMusic,
  playerCtrlDistToCamera = 0,
  boxOffset = 0,
  pauseMenuActive = 0,
  invertControls = 1,
  scoreDist = 600,
  speedBoost = 0;
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
  //inGameMusic = loadSound("music.m4a");
  //airplaneNoisesInFlight = loadSound("propeller-plane-flying-steady-01.mp3");
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
  ring = new Ring();
  waveWidth = 500;
  skyBox = new SkyBox(3000);
  noiseDetail(8);

  callCameraSetup();
  userStartAudio();
  //let music = new p5.SoundLoop(airplaneNoisesInFlight);
  //music.start();
  frameRate(60);
}

function draw() {
  background(200, 70, 100);

  w = 55 + boxOffset;
  //if(hotStreak > 0){
    //speedBoost = hotStreak / 500;
    //constrain(speedBoost, 0, 0.2);
  //}else if(hotStreak === 0) {speedBoost = 0}
    //console.log(speedBoost);
  let waveSpeed = 0.05; //+ speedBoost;
  updateCamera();

  //console.log(cameraX,cameraY,cameraZ);
  translate(cameraX, cameraY, cameraZ + playerCtrlDistToCamera);

  skyBox.render();

  //pointLight(60,100,100, 0,300, -800);
  ambientLight(0, 0, 360);

  rotateX(radians(cameraRotationsX));
  rotateZ(radians(cameraRotationsZ));

  push();
  translate(width / 1.5 -325, -height / 1.5, -1000);
  textSize(50);
  textFont(font);
  fill(0);
  text("Press Esc to pause the game.", 0, 0);
  pop();

  //Instructions || controls
  if (pauseMenuActive === 1) {
  
  scoreDist = -1500;
  //HighScore counter
  push();
  textSize(40);
  textFont(font);
  fill(0, 100, 0);
  translate(-width + 100, -height / 3, -1200);
  text("Your HighScore and HotScore", 0, 0);
  textSize(60);
  fill(180, 100, 100);
  text(ring.highScore, 175, 75);
  text(ring.recordHotStreak, 420, 75);
  rotateY(radians(45));
  pop();

  push();
    translate(-width + 100, -height /1.25, -1200);
    // translate(-450, 20, plane1.pos.z - 400);
    textSize(50);
    textFont(font);
    fill(0);
    text("Controls:", 0, 0);
    textSize(40);
    translate(0, 50, 0);
    text("WASD for normal movement", 0, 0);
    text("Q & E for Rotational Movement", 0, 40);
    text("To reset the page press Ctrl + R", 0, 80);
    //text("To look around the scene use your MOUSE buttons", 0, 120);
    text("Use R to switch into diffent point of views", 0, 120);
    text(
      "Use the Brackets [" + playerCtrlDistToCamera + "] to tweak your POV",
      0,
      160
    );
    text("Use the Parenthesis (" + boxOffset + ") to change wave detail", 0, 200);
    text(
      "use the Arrows <" + floor(plane1.color) + "> to change color",
      0,
      240
    );
    text("Press F to invert controls",0,280);
    // text("Press C to hide and show the controls", 0, 280);
    rotateY(radians(45));
    pop();
  } else {scoreDist = -600}

  //point Counter
  push();
  translate(scoreDist - 2, -25, -1000);
  textSize(50);
  textFont(font);
  fill(0);
  score = ring.score;
  text("Score >		      " + score, 0, 0);
  pop();

  //hotStreakCounter
  push();
  textSize(50);
  textFont(font);
  fill(0);
  translate(scoreDist, -100, -1000);
  hotStreak = ring.hotStreak;
  text("Hot Streak > " + hotStreak, -1, 0);
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

  for (let z = waveDistance + 200; z > waveDistance - 700; z -= w) {
    let waveStrength = map(z, 200, -500, 2, 3);

    for (let x = -waveWidth; x < waveWidth; x += w) {
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

  if (planeHitWater === 0 && pauseMenuActive === 0) {
    xoff += waveSpeed;
    waveInc += 0.001;

    if (keyIsDown("68")) {
      plane1.acc.x += cameraMvntSpdX;
      plane1.bankAngleZ += 2.2;
      //plane1.isReceivingInput += 1;
      usedRotation = 0;
    } else if (keyIsDown("65")) {
      plane1.acc.x -= cameraMvntSpdX;
      plane1.bankAngleZ -= 2.2;
      //  plane1.isReceivingInput += 1;
      usedRotation = 0;
    }

    if (keyIsDown("83")) {
      plane1.acc.y -= cameraMvntSpdY * invertControls;
      plane1.bankAngleX -= 1.7 * invertControls;
    } else if (keyIsDown("87")) {
      plane1.acc.y += cameraMvntSpdY * invertControls;
      plane1.bankAngleX += 1.7 * invertControls;
    }
    if (keyIsDown("69")) {
      plane1.bankAngleZ += 2.5;
      usedRotation = 1;
      plane1.isReceivingInput = 1;
    } else if (keyIsDown("81")) {
      plane1.bankAngleZ -= 2.5;
      usedRotation = 1;
      plane1.isReceivingInput = 1;
    } else {
      plane1.isReceivingInput = 0;
    }
    //console.log(plane1.isReceivingInput);
    //if (plane1.bankAngleVelZ > 0 && plane1.bank)
    // if (
    //   (plane1.bankAngleVelZ > 0 && usedRotation === 0) ||
    //   (plane1.bankAngleVelZ < 0 && usedRotation === 0)
    // ) {
    //   plane1.bankAngleVelZ *= 0.95;
    // } else {
    //   plane1.bankAngleVelZ *= 0.99;
    // }
    // if (plane1.bankAngleVelX > 0 || plane1.bankAngleVelX < 0) {
    //   plane1.bankAngleVelX *= 0.95;
    // }

    plane1.update();

    //
    push();
    plane1.render();

    // if(mouseIsPressed){
    // plane1.mouseInput();}
    //trail.run(plane.pos);
    if (!hidePlane) {
      ps.addParticle(2);
      ps.run();
      ps1.addParticle(2);
      ps1.run();
    }
    pop();

    ring.update(plane1);
    ring.render();
  } else if (pauseMenuActive === 1) {
    //rotateX(radians(-this.bankAngleVelX));
    push();
    rotateX(radians(-cameraRotationsX / 2));
    rotateZ(radians(-cameraRotationsZ / 2));
    translate(-450, constrain(plane1.pos.y, 0, 200), plane1.pos.z - 400);
    fill(360, 100, 0);
    textFont(font);
    textSize(150);
    text("Game Paused", 0, 0);
    pop();

    plane1.render();
  } else if (planeHitWater === 1) {
    //airplaneNoisesInFlight.pause();
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
      plane1.customColor = 100;
    }
  }
}

function keyReleased() {
  if(keyCode === 70 && invertControls === 1) {
    invertControls = -1;
  } else if(keyCode === 70) {
    invertControls = 1;
  }

  if (keyCode === 82) {
    povPosition++;
  }
  if (keyCode === 67 && showControls < 1) {
    showControls++;
  } else if (keyCode === 67) {
    showControls = 0;
  }
  if (keyCode === 219) {
    playerCtrlDistToCamera -= 25;
  } else if (keyCode === 221) {
    playerCtrlDistToCamera += 25;
  }
  if (keyCode === 57) {
    boxOffset -= 5;
  } else if (keyCode === 48) {
    boxOffset += 5;
  }
  if (
    keyCode === 188 &&
    plane1.color >= 0.4 &&
    plane1.highScoreColorScroll === 0
  ) {
    plane1.color -= 10;
    plane1.customColor = 100;
    plane1.isNotDark = 100;
  } else if (
    keyCode === 188 &&
    plane1.color <= 0 &&
    plane1.highScoreColorScroll === 0
  ) {
    plane1.customColor = 0;
  }
  if (
    keyCode === 190 &&
    plane1.color <= 99.5 &&
    plane1.highScoreColorScroll === 0
  ) {
    plane1.color += 10;
    plane1.customColor = 100;
    plane1.isNotDark = 100;
  } else if (
    keyCode === 190 &&
    plane1.color >= 100 &&
    plane1.highScoreColorScroll === 0
  ) {
    plane1.isNotDark = 0;
  }
  if (keyCode === 27 && pauseMenuActive === 0) {
    pauseMenuActive = 1;
  } else if (keyCode === 27 && pauseMenuActive === 1) {
    plane1.vel.mult(0);
    plane1.update();
    plane1.render();
    pauseMenuActive = 0;
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
