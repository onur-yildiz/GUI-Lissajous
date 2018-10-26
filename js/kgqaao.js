CanvasRenderingContext2D.prototype.fade = function(alpha) {
  if (arguments.length === 0) alpha = 0.95
  this.save()
  this.setTransform(1, 0, 0, 1, 0, 0)
  this.globalAlpha = alpha
  this.fillStyle = '#000'
  this.globalCompositeOperation = 'destination-in'
  this.fillRect(0, 0, this.canvas.width, this.canvas.height)
  this.restore()
}