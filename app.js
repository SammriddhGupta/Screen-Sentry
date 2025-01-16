const enableButton = document.getElementById('enable-button');
const disableButton = document.getElementById('disable-button');
const statusText = document.getElementById('status');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let videoStream;
let human;
let warningDiv;

function initWarningDiv() {
  warningDiv = document.createElement('div');
  warningDiv.className = 'warning';
  warningDiv.textContent = 'You are too close to the screen!';
  document.body.appendChild(warningDiv);
}

async function initHuman() {
  human = new Human.Human({
    modelBasePath: 'https://cdn.jsdelivr.net/npm/@vladmandic/human/models',
    face: { enabled: true },
    body: { enabled: false },
    hand: { enabled: false },
    object: { enabled: false },
  });
  await human.load();
}

async function startFaceDetection() {
  const video = document.createElement('video');
  video.srcObject = videoStream;
  await video.play();

  async function detect() {
    const results = await human.detect(video);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    if (results.face.length > 0) {
      const face = results.face[0];
      const face_width = face.box[2];
      //console.log("Face width is ", face_width);
      const distance = calculateDistance(face_width);
      //console.log("Distance is ", distance);

      if (distance < 0.0035) {
        warnUser();
      }
      drawFaceBox(face.box);
    }
    requestAnimationFrame(detect);
  }
  detect();
}

function calculateDistance(faceWidth) {
  return 1 / faceWidth;
}

function drawFaceBox(box) {
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'red';
  ctx.rect(...box);
  ctx.stroke();
}

function warnUser() {
  if (!warningDiv) return;

  warningDiv.classList.add('show');
  setTimeout(() => {
    warningDiv.classList.remove('show');
  }, 3000);

  const audio = new Audio('warning.mp3');
  audio.play();
}

enableButton.addEventListener('click', async () => {
  try {
    videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
    statusText.textContent = "Camera is on. Detecting distance...";
    enableButton.disabled = true;
    disableButton.disabled = false;
    await initHuman();
    startFaceDetection();
  } catch (error) {
    statusText.textContent = "Error accessing camera: " + error.message;
  }
});

disableButton.addEventListener('click', () => {
  if (videoStream) {
    videoStream.getTracks().forEach((track) => track.stop());
    statusText.textContent = "Camera is off.";
    enableButton.disabled = false;
    disableButton.disabled = true;
  }
});

initWarningDiv();