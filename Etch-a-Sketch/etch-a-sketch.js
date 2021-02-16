// select elements on the page- canvas, shake buttons
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shake = document.querySelector('.shake');
const MOVE_AMOUNT = 10;

// setup our canvas for drawing
const { width } = canvas;
const { height } = canvas;
console.log(width, height);

// random starting point on canvas

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;

ctx.beginPath(); // beginPath
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();
// write draw function
function draw({ key }) {
  // begin path
  ctx.beginPath();
  ctx.moveTo(x, y);
  // move pen
  switch (key) {
    case 'ArrowUp':
      y -= MOVE_AMOUNT;
      break;
    case 'ArrowDown':
      y += MOVE_AMOUNT;
      break;
    case 'ArrowRight':
      x += MOVE_AMOUNT;
      break;
    case 'ArrowLeft':
      x -= MOVE_AMOUNT;
      break;
    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}
// key handler for drawing
function handleDraw(e) {
  if (e.key.includes('Arrow')) {
    e.preventDefault();
    draw({ key: e.key });
  }
}
// key handler for color
function handleColor(e) {
  console.log(e.which);

  switch (e.key) {
    case 'b':
      ctx.strokeStyle = '#1241ea';
      break;
    case 'o':
      ctx.strokeStyle = '#ea5312';
      break;
    case 'g':
      ctx.strokeStyle = '#5bea12';
      break;
    case 'y':
      ctx.strokeStyle = '#e7de06';
      break;
    default:
      if (e.key !== 'b' || e.key !== 'o' || e.key !== 'g' || e.key !== 'y') {
        ctx.strokeStyle = '#000';
      }
      break;
  }
}

// add and handle shake button listener
function fireShake() {
  canvas.classList.add('shake');
  setTimeout(function() {
    window.location.reload(true);
  }, 500);

  console.log('fired');
}
shake.addEventListener('click', fireShake);
window.addEventListener('keydown', handleDraw);
window.addEventListener('keypress', handleColor);
