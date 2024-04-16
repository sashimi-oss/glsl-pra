let vs = `
   precision highp float;

   attribute vec3 aPosition;
   attribute vec2 aTexCoord;
   varying vec2 vTexCoord;

   uniform mat4 uProjectionMatrix;
   uniform mat4 uModelViewMatrix;

   void main() {
      vec4 positionVec4 = vec4(aPosition, 1.0);

      vTexCoord = aTexCoord;

      gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
   }
`;

let fs = `
   precision highp float;

   varying vec2 vTexCoord;

   uniform float u_time;
   const float pi = 3.1415926535;

   void main() {
      vec2 b = vTexCoord * 2.0 - 1.0;
      b.y += sin(pi/10.0 * u_time );
      vec3 col = vec3(pow(1.0 - abs(b.y), 8.0) * 2.0);
      col *= vec3(0.2, 0.5, 0.9) ;

      gl_FragColor = vec4(col, 1.0);
    }
`;

let theShader;

function setup() {
   createCanvas(500, 500, WEBGL);

   theShader = createShader(vs, fs);

   rectMode(CENTER);
   noStroke();
}

function draw(){
   const wh = 75 ;
   let t = frameCount / 10;

   background("#B0D0B0");

   shader(theShader);

   theShader.setUniform('u_time', t);
   push();
   translate(100, -150);
   rotate(radians(30));
   rect(0, 0, wh, wh);
   pop();

   theShader.setUniform('u_time', t/2);
   push();
   translate(100, -50);
   rotate(radians(60));
   ellipse(0, 0, wh, wh);
   pop();

   theShader.setUniform('u_time', t/3);
   push();
   translate(100, 50);
   rotate(radians(270));
   triangle(0, -wh/2, wh/2, wh/2, -wh/2, wh/2);
   pop();

   theShader.setUniform('u_time', t/4);
   push();
   translate(100, 150);
   rotate(radians(-30));
   plane(wh, wh);
   pop();

   resetShader();

   push();
   translate(-100, -150);
   rotate(radians(30));
   rect(0, 0, wh, wh);
   pop();

   push();
   translate(-100, -50);
   rotate(radians(60));
   ellipse(0, 0, wh, wh);
   pop();

   push();
   translate(-100, 50);
   rotate(radians(270));
   triangle(0, -wh/2, wh/2, wh/2, -wh/2, wh/2);
   pop();

   push();
   translate(-100, 150);
   rotate(radians(-30));
   plane(wh, wh);
   pop();
}