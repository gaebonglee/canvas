import Particle from "./js/Particle.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio;
let canvasWidth = innerWidth;
let canvasHeight = innerHeight;
const interval = 1000 / 60;

const particles = [];

function init() {
  canvasWidth = innerWidth;
  canvasHeight = innerHeight;
  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";
  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  //특정 디바이스에서 더 선명하게
  ctx.scale(dpr, dpr);
}

function createRing() {
  const PARTICLE_NUM = 800;
  for (let i = 0; i < PARTICLE_NUM; i++) {
    particles.push(new Particle());
  }
}

function render() {
  let now, delta;
  let then = Date.now();

  const frame = () => {
    requestAnimationFrame(frame);
    now = Date.now();
    delta = now - then;
    if (delta < interval) return;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    //for문으로 거꾸로 순회하여 사이드 이펙트가 생기지 않도록 할 수 있음
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw(ctx);
    }
    if (particles[i].opacity < 0) particles.splice(i, 1);

    //아래처럼 작성하면 반짝이면서 사라지는 듯한 애니메이션이 구현됨. splice로 제거할 경우 기존 배열을 직접 수정하기 때문에 다음 index의 particle이 제거된 particle의 위치로 이동되면서 해당 index의 particle을 건너뛰는 현상 발생하며 사이드 이펙트가 발생하는 것임.
    // particles.forEach((particle, index) => {
    //   particle.update();
    //   particle.draw(ctx);

    //   if (particle.opacity < 0) particles.splice(index, 1);
    // });

    then = now - (delta % interval);
  };
  requestAnimationFrame(frame);
}

window.addEventListener("load", () => {
  init();
  render();
});

window.addEventListener("resize", init);

window.addEventListener("click", () => {
  createRing();
});
