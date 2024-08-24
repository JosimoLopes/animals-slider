import { SliderNav } from "./slider.js";

const slider = new SliderNav(".wrapper", ".slider");
slider.init();
slider.addArrow(".prev", ".next");
slider.addControl(".custom__control");
