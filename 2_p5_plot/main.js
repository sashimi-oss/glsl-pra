let t = 0;
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);

  t++;
  angleMode(DEGREES);
  fill(10, 20, 255);
  stroke(10, 20, 255);
  drawingContext.shadowBlur = 30;
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowColor = color(240,240,255);
  for(let i = 0; i < 400; i +=5){
    ellipse(i, -200 * sin(i-t) + 200, 10, 10);
  }
}