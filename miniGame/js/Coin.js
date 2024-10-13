import App from "./App.js";

export default class Coin {
  constructor() {
    this.img = document.querySelector("#coin-img");
    this.counter = 0;
    this.frameX = 0;
  }
  update() {
    if (++this.counter % 2 === 0) {
      // this.frameX += 1;
      // if (this.frameX === 10) this.frameX = 0;
      // 위 코드를 아래와 같이 작성할 수 있음
      this.frameX = ++this.frameX % 10;
    }
  }
  draw() {
    App.ctx.drawImage(
      this.img,
      (this.img.width / 10) * this.frameX,
      0,
      this.img.width / 10,
      this.img.height,
      100,
      100,
      100,
      100
    );
  }
}
