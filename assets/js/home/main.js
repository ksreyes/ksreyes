import { popden } from "./popden-icon.js";
import { econ } from "./econ-icon.js";
import { mrio } from "./mrio-icon.js";
import { mmp } from "./mmp-icon.js";

document.addEventListener("DOMContentLoaded", function() {
    console.log("Page loaded.")
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

d3.select(".profile-pic")
    .on("click", async () => {
        console.log("Click!");
        d3.select(".profile-pic").classed("shake", true);
        await sleep(500);
        d3.select(".profile-pic").classed("shake", false);
    })

d3.select("#popden div").call(popden);
d3.select("#econ div").call(econ);
d3.select("#mrio div").call(mrio);
d3.select("#mmp div").call(mmp);

console.log("Hello")