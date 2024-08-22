export default class Slider {
  constructor(wrapper, slider) {
    this.wrapper = document.querySelector(wrapper);
    this.slider = document.querySelector(slider);
  }

  onStart(ev) {
    ev.preventDefault();
    this.wrapper.addEventListener("mousemove", this.onMove);

    console.log(this);
  }

  onMove() {
    console.log("moving");
  }

  onEnd() {
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
