/**
 * @param {String | Array}
 * @return {Image}
 *  */
function createImage(src) {
  let img;
  if (typeof src === "string") {
    img = new Image(); // 异步加载
    img.src = src;
  } else {
    img = [];
    for (let i = 0; i < src.length; i++) {
      img[i] = new Image();
      img[i].src = src[i];
    }
  }
  return img;
}

const IMAGEList = {
  bg: "./img/bg/bg.jpg",
  logo: "./img/logo/logo.webp",
  pause: "./img/pause/pause.png",
  loadingFrame: [
    "./img/loading/loading-1.png",
    "./img/loading/loading-2.png",
    "./img/loading/loading-3.png",
    "./img/loading/loading-4.png",
    "./img/loading/loading-5.png",
    "./img/loading/loading-6.png",
    "./img/loading/loading-7.png",
    "./img/loading/loading-8.png",
  ],
  heroFrame: {
    live: ["./img/hero/hero_live_1.png", "./img/hero/hero_live_2.png"],
    death: [
      "./img/hero/hero_death_1.png",
      "./img/hero/hero_death_2.png",
      "./img/hero/hero_death_3.png",
    ],
  },
  bulletImg: "./img/bullet/bullet.png",
  e1Frame: {
    live: ["./img/enemy/e1_live_1.png", "./img/enemy/e1_live_2.png"],
    death: ["./img/enemy/e1_death_1.png", "./img/enemy/e1_death_2.png"],
  },
  e2Frame: {
    live: ["./img/enemy/e2_live_1.png", "./img/enemy/e2_live_2.png"],
    death: ["./img/enemy/e2_death_1.png", "./img/enemy/e2_death_2.png"],
  },
  e3Frame: {
    live: ["./img/enemy/e3_live_1.png", "./img/enemy/e3_live_2.png"],
    death: ["./img/enemy/e3_death_1.png", "./img/enemy/e3_death_2.png"],
  },
};

//   初始化背景
const bg = createImage(IMAGEList.bg); // 异步加载

//   初始化logo
const logo = createImage(IMAGEList.logo);

//   初始化暂停
const pause = createImage(IMAGEList.pause);

// 初始化loadig
const loadingFrame = createImage(IMAGEList.loadingFrame);

// 初始化飞机
const heroFrame = {
  live: createImage(IMAGEList.heroFrame.live),
  death: createImage(IMAGEList.heroFrame.death),
};

// 初始化子弹
const bulletImg = createImage(IMAGEList.bulletImg);

// 初始化敌机
// e1
const e1Frame = {
  live: createImage(IMAGEList.e1Frame.live),
  death: createImage(IMAGEList.e1Frame.death),
};
// e2
const e2Frame = {
  live: createImage(IMAGEList.e2Frame.live),
  death: createImage(IMAGEList.e2Frame.death),
};
// e3
const e3Frame = {
  live: createImage(IMAGEList.e3Frame.live),
  death: createImage(IMAGEList.e3Frame.death),
};

// 游戏状态
const START = 0;
const STARTING = 1;
const RUNNING = 2;
const PAUSE = 3;
const END = 4;

// 初始状态
let state = START;

// 初始化分数
let score = 0;
let life = 3;

//   天空类配置
const SkyConfig = {
  bg: bg,
  width: 480,
  height: 650,
  speed: 10,
};

//   加载类配置
const LoadingConfig = {
  bg: loadingFrame,
  width: 197,
  height: 193,
  x: 0,
  y: 650 - 193,
  speed: 100,
};

//   英雄类配置
const HeroConfig = {
  bg: heroFrame,
  width: 128,
  height: 128,
  speed: 200,
  shotInterval: 50,
};

// 子弹类配置
const BulletConfig = {
  bg: bulletImg,
  width: 20,
  height: 58,
};

// 敌机类
const e1Config = {
  type: 1,
  frame: e1Frame,
  width: 89,
  height: 68,
  life: 1,
  score: 1,
  minSpeed: 20,
  maxSpeed: 10,
};
const e2Config = {
  type: 2,
  frame: e2Frame,
  width: 197,
  height: 134,
  life: 5,
  score: 5,
  minSpeed: 50,
  maxSpeed: 20,
};
const e3Config = {
  type: 1,
  frame: e3Frame,
  width: 240,
  height: 240,
  life: 20,
  score: 20,
  minSpeed: 100,
  maxSpeed: 100,
};
