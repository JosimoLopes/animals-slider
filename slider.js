export default class Slider {
  constructor(wrapper, slider) {
    this.wrapper = document.querySelector(wrapper);
    this.slider = document.querySelector(slider);
    this.dist = { finalPosition: 0, startX: 0, movement: 0 };
  }

  transition(active) {
    this.slider.style.transition = active ? "transform .3s" : "";
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
    let moveType;
    if (ev.type === "mousedown") {
      ev.preventDefault();
      this.dist.startX = ev.pageX;
      moveType = "mousemove";
    } else {
      this.dist.startX = ev.changedTouches[0].pageX;
      moveType = "touchmove";
    }
    this.wrapper.addEventListener(moveType, this.onMove);
    this.transition(false);
  }

  onMove({ type, pageX, changedTouches }) {
    const pointerPosition = type === "mousemove" ? pageX : changedTouches[0].pageX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }

  onEnd({ type }) {
    const moveType = type === "mouseup" ? "mousemove" : "touchmove";
    this.dist.finalPosition = this.dist.movePosition;
    this.wrapper.removeEventListener(moveType, this.onMove);
    this.transition(true);
    this.changeSlideOnEnd();
  }

  changeSlideOnEnd() {
    if (this.dist.movement > 120 && this.index.next !== undefined) {
      this.goToNextSlide();
    } else if (this.dist.movement < -120 && this.index.prev !== undefined) {
      this.goToPrevSlide();
    } else {
      this.changeSlide(this.index.current);
    }
  }

  onMouseLeave() {
    if (this.index.prev === undefined || this.index.next === undefined) this.changeSlide(this.index.current);
    this.wrapper.removeEventListener("mousemove", this.onMove);
  }

  addEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("touchstart", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
    this.wrapper.addEventListener("touchend", this.onEnd);
    this.wrapper.addEventListener("mouseleave", this.onMouseLeave);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  // Slides Config

  slidePosition(slide) {
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  slidesConfig() {
    this.slidesArray = [...this.slider.children].map((el) => {
      const position = this.slidePosition(el);
      return { position, el };
    });
  }

  slideIndexNav(i) {
    const last = this.slidesArray.length - 1;
    this.index = {
      prev: i ? i - 1 : undefined,
      current: i,
      next: i === last ? undefined : i + 1,
    };
  }

  changeSlide(i) {
    const currentSlide = this.slidesArray[i];
    this.moveSlide(currentSlide.position);
    this.slideIndexNav(i);
    this.dist.finalPosition = currentSlide.position;
    console.log(this.index);
  }

  goToPrevSlide() {
    if (this.index.prev !== undefined) this.changeSlide(this.index.prev);
  }

  goToNextSlide() {
    if (this.index.next !== undefined) this.changeSlide(this.index.next);
  }

  init() {
    this.bindEvents();
    this.transition(true);
    this.addEvents();
    this.slidesConfig();

    return this;
  }
}
