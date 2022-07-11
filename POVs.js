function callCameraSetup() {
  cameraX = 0;
  cameraY = -100;
  cameraZ = 250;
  cameraRotationsX = 0;
  cameraRotationsZ = 0;
  numberOfPOVs = 3;
  povPosition = 0;
  hidePlane = false;
  waveDistance = 0;
  showControls = 1;
  cameraMvntSpdX;
  cameraMvntSpdY;
}
//first Person
function updateCamera() {
  if (povPosition == 0) {
    cameraX = 0;
    cameraY = 0;
    cameraZ = 300;
    cameraRotationsX = -5;
    cameraRotationsZ = 0;
    hidePlane = false;
    waveDistance = 0;
    plane.velDampening = 0.95;
    cameraMvntSpdX = 0.15;
    cameraMvntSpdY = 0.15;
  } else if (povPosition == 1) {
    cameraX = -plane1.pos.x;
    cameraY = -plane1.pos.y;
    cameraZ = plane1.pos.z + 350;
    cameraRotationsX = -plane1.bankAngleVelX / 3.5;
    cameraRotationsZ = 0;
    hidePlane = false;
    waveDistance = 0;
    plane.velDampening = 0.95;
    cameraMvntSpdX = 0.13;
    cameraMvntSpdY = 0.13;
  } else if (povPosition == 2) {
    cameraX = -plane1.pos.x;
    cameraY = -plane1.pos.y + 20;
    cameraZ = plane1.pos.z + 550;
    cameraRotationsX = -plane1.bankAngleVelX / 3.5;
    cameraRotationsZ = -plane1.bankAngleVelZ / 3.5;
    hidePlane = false;
    waveDistance = -50;
    plane1.velDampening = 0.97;
    cameraMvntSpdX = 0.12;
    cameraMvntSpdY = 0.12;
  } else if (povPosition == 3) {
    cameraX = -plane1.pos.x;
    cameraY = -plane1.pos.y;
    cameraZ = plane1.pos.z + 650;
    cameraRotationsX = -plane1.bankAngleVelX / 3.5;
    cameraRotationsZ = -plane1.bankAngleVelZ / 3.5;
    hidePlane = true;
    waveDistance = -50;
    plane1.velDampening = 0.97;
    cameraMvntSpdX = 0.12;
    cameraMvntSpdY = 0.12;
  }

  if (povPosition > numberOfPOVs) {
    povPosition = 0;
  }
  //console.log(povPosition);
}
