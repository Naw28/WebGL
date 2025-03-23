var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'uniform mat4 u_xformMatrix;\n' +
  'void main() {\n' +
  '  gl_Position = u_xformMatrix * a_Position;\n' +
  '}\n';

var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  '}\n';

var x = 0.0, y = 0.0;
var Tx = 0.0, Ty = 0.0;

function main() {
  var canvas = document.getElementById('webGL');
  var gl = getWebGLContext(canvas);
  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

  var u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');
  var n = initVertexBuffers(gl);

  var xformMatrix = new Matrix4();
  gl.clearColor(0, 0, 0, 1);

  function tick() {
    x += Tx;
    y += Ty;

    if(x > 0.5) x = 0.5;
    if(x < -0.5) x = -0.5;
    if(y > 0.5) y = 0.5;
    if(y < -0.5) y = -0.5;
    xformMatrix.setTranslate(x, y, 0);
    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, n);

    requestAnimationFrame(tick);
  }

  tick();
}

function initVertexBuffers(gl) {
  var Hoimon = new Float32Array([
    0, 0.5, -0.5, -0.5, 0.5, -0.5
  ]);
  var n = 3;
  var Bom = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, Bom);
  gl.bufferData(gl.ARRAY_BUFFER, Hoimon, gl.STATIC_DRAW);
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);
  return n;
}


function trai() { Tx = -0.02; Ty = 0.0; }
function phai() { Tx = 0.02; Ty = 0.0; }
function tren() { Ty = 0.02; Tx = 0.0; }
function duoi() { Ty = -0.02; Tx = 0.0; }
function dung() { Tx = 0.0; Ty = 0.0; }
