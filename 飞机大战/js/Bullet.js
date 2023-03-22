// 4-子弹类
class Bullet {
  constructor(config, x, y) {
    this.bg = config.bg;
    this.width = config.width;
    this.height = config.height;
    this.x = x;
    this.y = y;
    this.destroy = false;
  }

  move() {
    this.y -= 25;
  }

  paint(context) {
    context.drawImage(this.bg, this.x, this.y);
  }

  outOfBounds() {
    return this.y < -this.height;
  }

  collide() {
    this.destroy = true;
  }
}
