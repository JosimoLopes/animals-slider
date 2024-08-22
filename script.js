import Slider from "./slider.js";

const slider = new Slider(".wrapper", ".slider");
slider.init();
slider.changeSlide(0);
slider.goToPrevSlide();
