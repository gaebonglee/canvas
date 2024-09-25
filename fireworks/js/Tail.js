import CanvasOption from "./CanvasOption.js";
import { randomNumBetween } from "./Utils.js";

export default class Tail extends CanvasOption {
  constructor(x, vy, colorDeg) {
    super();
    this.x = x;
    this.y = this.canvasHeight;
    this.vy = vy;
    this.colorDeg = colorDeg;
    this.friction = 0.985;
    // this.radius = 5;
    // this.opacity = 1;
    this.angle = randomNumBetween(0, 2);
  }
  update() {
    this.vy *= this.friction;
    this.y += this.vy;

    this.angle += 1;
    this.x += Math.cos(this.angle) * this.vy * 0.2;

    this.opacity = -this.vy * 0.15;
  }

  draw() {
    this.ctx.fillStyle = `hsla(${this.colorDeg}, 100%, 65%, ${this.opacity})`;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 1.7, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
