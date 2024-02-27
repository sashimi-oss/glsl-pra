let vs = `
  precision highp float;

  attribute vec3 aPosition;

  void main() {
     vec4 positionVec4 = vec4(aPosition, 1.0);

     gl_Position = positionVec4;
}
`;

let fs = `
  precision highp float;

  uniform vec2 resolution;
  uniform float time;

  const float freq = 20.0;

  void main() {
    vec3 color;

    vec2 uv = gl_FragCoord.xy / resolution - 1.0;
    uv.x *= resolution.x/resolution.y;
    //uv = (uv - 1.0) * 2.0;

    float d = length(uv);
    d -= 0.5;
    d = abs(d);
    d = smoothstep(0.0, 0.1, d);

    color = vec3(d, d, d);

    gl_FragColor = vec4(color, 1.0);
}
`;

let theShader;

function setup() {
  //  createCanvas(640, 360, WEBGL);
   createCanvas(500, 500, WEBGL);

   theShader = createShader(vs, fs);
   noStroke();

  shader(theShader);
   theShader.setUniform('resolution', [width, height]);
   theShader.setUniform("time", millis() / 1000.0);
  //  theShader.setUniform("mouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  quad(-1, -1, -1, 1, 1, 1, 1, -1);
  resetShader();
}