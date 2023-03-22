// 5-敌机类
class Enemy {
  constructor(config) {
    this.type = config.type;
    this.width = config.width;
    this.height = config.height;
    this.life = config.life;
    this.score = config.score;
    this.frame = config.frame;
    // 当前的状态
    this.img = config.frame.live[0];
    // 判断生死状态，播放死亡动画
    this.alive = true;

    // 飞行速度
    // this.minSpeed = config.minSpeed;
    // this.maxSpeed = config.maxSpeed;
    // 位置
    this.x = Math.floor(Math.random() * (480 - config.width));
    this.y = -config.height;
    // 上个时间
    this.lastTime = new Date().getTime();
    // 飞行速度
    this.speed =
      Math.floor(Math.random() * (config.minSpeed - config.maxSpeed + 1)) +
      config.maxSpeed;
    // 死亡动画
    this.currentDeathIndex = 0;
    // 销毁状态
    this.destroy = false;
  }

  move() {
    // 判断是否移动渲染
    const currentTime = new Date().getTime();
    if (currentTime - this.lastTime >= this.speed) {
      if (this.alive) {
        this.img = this.frame.live[0];
        this.y++;
      } else {
        this.img = this.frame.death[this.currentDeathIndex++];
        // 播放死亡动画最后一帧时
        if (this.currentDeathIndex === this.frame.death.length) {
          this.destroy = true;
        }
      }
      this.lastTime = currentTime;
    }
  }

  paint(context) {
    context.drawImage(this.img, this.x, this.y);
  }

  hit(o) {
    let ol = o.x;
    let or = o.x + o.width;
    let ot = o.y;
    let ob = o.y + o.height;

    // 敌机
    let el = this.x;
    let er = this.x + this.width;
    let et = this.y;
    let eb = this.y + this.height;

    if (ol > er || or < el || ot > eb || ob < et) {
      return false;
    } else {
      return true;
    }
  }

  collide() {
    this.life--;
    if (this.life === 0) {
      this.alive = false;
      score += this.score;
    }
  }

  outOfBounds() {
    if (this.y > 650) {
      return true;
    }
  }
}
