// 初始化画布
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// 面向对象(静态属性和动态方法)

//   开始状态-》开始时状态
canvas.addEventListener("click", () => {
  if (state === START) {
    state = STARTING;
  }
});

//   运行时状态
canvas.addEventListener("mousemove", (e) => {
  let x = e.offsetX;
  let y = e.offsetY;
  hero.x = x - hero.width / 2;
  hero.y = y - hero.height / 2;
});

// 监听暂停状态
canvas.addEventListener("mouseleave", () => {
  if (state === RUNNING) {
    state = PAUSE;
  }
});
canvas.addEventListener("mouseenter", () => {
  if (state === PAUSE) {
    state = RUNNING;
  }
});

// 碰撞检测
function checkhit() {
  for (let i = 0; i < EnemyList.length; i++) {
    if (EnemyList[i].hit(hero)) {
      EnemyList[i].collide();
      hero.collide();
    }
    for (let j = 0; j < hero.bulletList.length; j++) {
      // 如果检测到了do something
      if (EnemyList[i].hit(hero.bulletList[j])) {
        EnemyList[i].collide();
        // 子弹碰撞
        hero.bulletList[j].collide();
      }
    }
  }
}

// 敌机刷新时间
let ENEMY_CREATE_INTERVAL = 800;
// 敌机初始化时间
let ENEMY_LASTTIME = new Date().getTime();
// 敌机容器
const EnemyList = [];

// 全局函数了，创建敌机
function createEnemy() {
  const currentTime = new Date().getTime();
  if (currentTime - ENEMY_LASTTIME > ENEMY_CREATE_INTERVAL) {
    // 敌机产生率 小60% 中30% 大10%  [0,99]
    let p = Math.floor(Math.random() * 100);
    if (p < 60) {
      EnemyList.push(new Enemy(e1Config));
    } else if (p < 90 && p > 60) {
      EnemyList.push(new Enemy(e2Config));
    } else {
      EnemyList.push(new Enemy(e3Config));
    }
    ENEMY_LASTTIME = currentTime;
  }
}

// 全局函数，判断子弹/敌人组件
function judgeComponent() {
  for (let i = 0; i < hero.bulletList.length; i++) {
    hero.bulletList[i].move();
  }
  for (let i = 0; i < EnemyList.length; i++) {
    EnemyList[i].move();
  }
}
// 全局函数，绘制子弹/敌人组件
function paintComponent(context) {
  for (let i = 0; i < hero.bulletList.length; i++) {
    hero.bulletList[i].paint(context);
  }
  for (let i = 0; i < EnemyList.length; i++) {
    EnemyList[i].paint(context);
  }
}
// 全局函数，销毁子弹/敌人组件
function destroyComponent() {
  if (hero.destroy) {
    // 生命减少
    life--;
    // 又活了
    hero.destroy = false;
    if (life === 0) {
      state = END;
    } else {
      // 死了一次重新复活
      hero = new Hero(HeroConfig);
    }
  }
  for (let i = 0; i < hero.bulletList.length; i++) {
    if (hero.bulletList[i].outOfBounds() || hero.bulletList[i].destroy) {
      hero.bulletList.splice(i, 1);
    }
    for (let i = 0; i < EnemyList.length; i++) {
      if (EnemyList[i].outOfBounds() || EnemyList[i].destroy) {
        EnemyList.splice(i, 1);
      }
    }
  }
}

//   实例化天空类
const sky = new Sky(SkyConfig);
// 实例化加载类
const loading = new Loading(LoadingConfig);
// 实例化英雄类
let hero = new Hero(HeroConfig);

//   但图片加载完毕时，需要do something 轮询
bg.addEventListener(
  "load",
  () => {
    // 刷新界面
    setInterval(() => {
      switch (state) {
        case START:
          // 渲染天空和logo
          sky.judge();
          sky.paint(ctx);
          let logo_x = (sky.width - logo.naturalWidth) / 2;
          let logo_y = (sky.height - logo.naturalHeight) / 2;
          ctx.drawImage(logo, logo_x, logo_y);
          break;
        case STARTING:
          // 渲染天空和loading动画
          sky.judge();
          sky.paint(ctx);
          loading.judge();
          loading.paint(ctx);
          break;
        case RUNNING:
          // 渲染天空，飞机，子弹，敌人
          sky.judge();
          sky.paint(ctx);
          // 分数
          ctx.font = "20px white";
          ctx.fillStyle = "red";
          ctx.textAlign = "left";
          ctx.fillText("score: " + score, 10, 20);
          ctx.textAlign = "right";
          ctx.fillText("life: " + life, 480 - 10, 20);

          // 恢复状态
          ctx.fillStyle = "white";
          ctx.textAlign = "left";
          //
          hero.judge();
          hero.paint(ctx);
          hero.shot(ctx);
          createEnemy();
          // 子弹轨迹
          judgeComponent();
          paintComponent(ctx);
          destroyComponent();
          checkhit();
          break;
        case PAUSE:
          let pause_x = (sky.width - pause.naturalWidth) / 2;
          let pause_y = (sky.height - pause.naturalHeight) / 2;
          ctx.drawImage(pause, pause_x, pause_y);
          break;
        case END:
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 40px red";

          ctx.fillText("GAME_OVER", 480 / 2, 650 / 2);
          break;
      }
    }, 10);
  },
  false
);
