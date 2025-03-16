import { popden } from "./js/popden-icon.js";
import { econ } from "./js/econ-icon.js";
import { mrio } from "./js/mrio-icon.js";

document.addEventListener("DOMContentLoaded", function() {
    console.log("Page loaded.")
});

d3.select("#popden div").call(popden);
d3.select("#econ div").call(econ);
d3.select("#mrio div").call(mrio);
