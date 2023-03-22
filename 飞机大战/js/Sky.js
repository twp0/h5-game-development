// 1-天空类
class Sky {
  constructor(config) {
    this.bg = config.bg;
    this.width = config.width;
    this.height = config.height;
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = -config.height;
    this.speed = config.speed;
    this.lastTime = new Date().getTime();
  }

  judge() {
    let currentTime = new Date().getTime();
    if (currentTime - this.lastTime > this.speed) {
      this.y1++;
      this.y2++;
      this.lastTime = currentTime;
    }
    if (this.y2 === 0) {
      /*无缝连接， 当描绘的两张图片都滚动完了，就重置为原来的位置*/
      this.y1 = 0;
      this.y2 = -this.height;
    }
  }

  paint(context) {
    context.drawImage(this.bg, this.x1, this.y1, this.width, this.height);
    context.drawImage(this.bg, this.x2, this.y2, this.width, this.height);
  }
}
