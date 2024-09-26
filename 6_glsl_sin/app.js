let vs = `
  precision highp float;

  attribute vec3 aPosition;

  void main() {
     vec4 positionVec4 = vec4(aPosition, 1.0);

     gl_Position = positionVec4;
}
`;

let fs = `
precision mediump float;
uniform float t; // time
uniform vec2  r; // resolution

void main(void){
    vec2 p = (gl_FragCoord.xy - r) / min(512.0, 512.0) ;
    vec3 destColor = vec3(0.0);
    for(float i = 0.0; i < 5.0; i++){
      float j = i + 1.0;
      vec2 q = p + vec2(cos(t * j), sin(t * j)) * 0.5;
      destColor += 0.05 / length(q);
    }
    gl_FragColor = vec4(vec3(destColor), 1.0);
}
`;

let theShader;

function setup() {
  //  createCanvas(640, 360, WEBGL);
   createCanvas(512, 512, WEBGL);

   theShader = createShader(vs, fs);
   noStroke();

  // shader(theShader);
  //theShader.setUniform('time', millis() / 1000.0);
  //  theShader.setUniform("mouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  //  resetShader();
  }
  function draw(){
    // console.log(millis()/1000.0);
    let t = frameCount / 30;
    shader(theShader);
    theShader.setUniform('resolution', [width, height]);
    theShader.setUniform('time', t);
    theShader.setUniform('r', [width, height]);
    theShader.setUniform('t', t);
    quad(-1, -1, -1, 1, 1, 1, 1, -1);
    resetShader();


    
}