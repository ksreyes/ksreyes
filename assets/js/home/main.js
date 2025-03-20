import { popden } from "./popden-icon.js";
import { econ } from "./econ-icon.js";
import { mrio } from "./mrio-icon.js";
import { mmp } from "./mmp-icon.js";

d3.select("#popden div").call(popden);
d3.select("#econ div").call(econ);
d3.select("#mrio div").call(mrio);
d3.select("#mmp div").call(mmp);

document.addEventListener("DOMContentLoaded", function() {
    console.log("Page loaded.")
});
