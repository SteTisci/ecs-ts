const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

if (ctx) {
  ctx.clearRect(0, 0, 600, 600);

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 600, 600);
}
