import { popden } from "./js/popden-icon.js";
import { econ } from "./js/econ-icon.js";

document.addEventListener("DOMContentLoaded", function() {
    console.log("Page loaded.")
});

d3.select("#popden div").call(popden);
d3.select("#econ div").call(econ);
