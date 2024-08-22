export default class Slider {
  constructor(wrapper, slider) {
    this.wrapper = document.querySelector(wrapper);
    this.slider = document.querySelector(slider);
    this.dist = { finalPosition: 0, startX: 0, movement: 0 };
  }

  moveSlide(distX) {
    this.dist.movePosition = distX;
    this.slider.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  updatePosition(pageX) {
    this.dist.movement = (this.dist.startX - pageX) * 1.6;
    return this.dist.finalPosition - this.dist.movement;
  }

  onStart(ev) {
    ev.preventDefault();
    this.dist.startX = ev.pageX;
    this.wrapper.addEventListener("mousemove", this.onMove);
  }

  onMove(ev) {
    const finalPosition = this.updatePosition(ev.pageX);
    this.moveSlide(finalPosition);
  }

  onEnd(ev) {
    this.dist.finalPosition = this.dist.movePosition;
    this.wrapper.removeEventListener("mousemove", this.onMove);
  }

  addEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  init() {
    this.bindEvents();
    this.addEvents();

    return this;
  }
}
