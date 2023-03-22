//   2-加载类
class Loading {
  constructor(config) {
    this.bg = config.bg;
    this.width = config.width;
    this.height = config.height;
    this.x = config.x;
    this.y = config.y;
    this.speed = config.speed;
    this.currentIndex = 0;
    this.lastTime = new Date().getTime();
  }

  judge() {
    let currentTime = new Date().getTime();
    // 判断间隔时间是否满足渲染下一帧
    if (currentTime - this.lastTime > this.speed) {
      this.currentIndex++;
      this.x += 20;
      if (this.currentIndex === 8) {
        this.currentIndex = 0;
        state = RUNNING;
      }
      this.lastTime = currentTime;
    }

    if (this.x === 200) {
      this.x = 0;
    }
  }

  paint(context) {
    context.drawImage(this.bg[this.currentIndex], this.x, this.y);
  }
}
