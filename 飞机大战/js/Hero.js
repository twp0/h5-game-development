//   3-英雄类
class Hero {
  constructor(config) {
    this.bg = config.bg;
    this.width = config.width;
    this.height = config.height;
    this.x = (480 - this.width) / 2;
    this.y = 650 - this.height;
    this.speed = config.speed;
    this.heroLiveIndex = 0;
    this.heroDeathIndex = 0;
    //   当前图片
    this.img = null;
    // 飞机状态
    this.alive = true;
    this.lastTime = new Date().getTime();
    // 子弹上一次发射时间
    this.lastShotTime = new Date().getTime();
    // 子弹的冷却时间
    this.shotInterval = config.shotInterval;
    // 子弹弹夹
    this.bulletList = [];
    // 销毁状态
    this.destroy = false;
  }

  judge() {
    const currentTime = new Date().getTime();
    if (currentTime - this.lastTime > this.speed) {
      if (this.alive) {
        this.img = this.bg.live[this.heroLiveIndex++ % this.bg.live.length];
      } else {
        this.img = this.bg.death[this.heroDeathIndex++];
        if (this.heroDeathIndex === this.bg.death.length) {
          this.destroy = true;
        }
      }
      this.lastTime = currentTime;
    }
  }

  paint(context) {
    context.drawImage(this.img, this.x, this.y);
  }

  shot(context) {
    let currentTime = new Date().getTime();
    if (currentTime - this.lastShotTime > this.shotInterval) {
      // 子弹射击
      let bullet = new Bullet(
        BulletConfig,
        this.x + this.width / 2 - BulletConfig.width / 2,
        this.y - BulletConfig.height
      );
      // 装入弹夹
      this.bulletList.push(bullet);
      // 子弹绘制
      bullet.paint(context);

      // 更新英雄射击时间
      this.lastShotTime = currentTime;
    }
  }

  collide() {
    // 活着 -》 爆炸中 -》 销毁
    this.alive = false;
  }
}
