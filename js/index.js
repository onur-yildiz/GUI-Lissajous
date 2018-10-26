function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var size = +document.querySelector('#main').dataset.width;
var canvas = document.querySelector('canvas');
canvas.width = size;
canvas.height = size;
var ctx = canvas.getContext('2d');
ctx.translate(size / 2, size / 2);
ctx.strokeStyle = '#7ed';
ctx.lineCap = 'round';var

sin = Math.sin,sqrt = Math.sqrt,random = Math.random,PI = Math.PI;
var A = size / 2 - 1;

var k = parseFloat(document.getElementById('k').value);
var delta = parseFloat(document.getElementById('delta').value);
var phi = parseFloat(document.getElementById('phi').value);
var theta = parseFloat(document.getElementById('theta').value);

var Lissajous = function Lissajous() {
  var _this = this;
  _classCallCheck(this, Lissajous);
  this.fade = false;
  this.setup = function () {
    delete _this.lastP;
    ctx.clearRect(-size / 2, -size / 2, size, size);
    _this._k = k;
    _this.delta = delta;
    _this.phi = phi;
    _this.theta = theta;
  };
  this.draw = function () {
    if (_this.fade) {
      ctx.fade();
    }
    var p = [
    sin(_this.theta) * A,
    sin(_this._k * _this.theta + _this.phi) * A];

    ctx.beginPath();
    ctx.moveTo.apply(ctx, _toConsumableArray(_this.lastP || p));
    ctx.lineTo.apply(ctx, p);
    ctx.stroke();

    _this.lastP = p;
    _this.theta += _this.delta;
    requestAnimationFrame(_this.draw);
  };
  this.setup();
  this.draw();
};

var lis = new Lissajous();

var p;
onUpdate = function() {  
  k = parseFloat(document.getElementById('k').value);
  delta = parseFloat(document.getElementById('delta').value);
  phi = parseFloat(document.getElementById('phi').value);
  theta = parseFloat(document.getElementById('theta').value);

  p = document.createElement('p');
  p.innerText = `${k}, ${delta}, ${phi}, ${theta}`;
  p.onclick = function () {
    var values = this.innerText.split(', ');
    document.getElementById('k').value = values[0];
    document.getElementById('delta').value = values[1];
    document.getElementById('phi').value = values[2];
    document.getElementById('theta').value = values[3];
    onUpdate();
  }
  document.getElementById('history').appendChild(p);
  lis.setup();
}

document.querySelector("form").addEventListener("keyup", function(event) {
  if(event.key !== "Enter") return;
  document.querySelector("#update").click();
  event.preventDefault();
});