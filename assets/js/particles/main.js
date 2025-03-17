

const cities = [
    { name: "Manila", value: 100 },
    { name: "Mandaluyong", value: 100 },
    { name: "San Juan", value: 100 },
];

const dim = { width: 800, height: 600 };

// Forms

d3.select("#particles-container .form-left")
    .call(addFormDropdown, cities)

d3.select("#particles-container .form-right")
    .call(addFormDropdown, cities)


// Panels

const panelLeft = d3.select("#particles-container .panel-left")

const svg = panelLeft.append("svg")
    // .attr("id", "viz-svg")
    .attr("width", dim.width)
    .attr("viewBox", [0, 0, dim.width, dim.height])
    .call(addPanel);





// Functions

function addFormDropdown(container, data) {
  
    const dropdown = container.append("form")
        .attr("id", "particles-dropdown")
        .attr("class", "select")
        .attr("margin-top", "10px");

    const addOption = (form, name) => {
        form.append("option")
            .text(name)
            .attr("value", name);
    };

    const dropdownOptions = dropdown.append("div").append("select");

    for (let i in data) {
        dropdownOptions.call(addOption, data[i].name);
    };

    return container.node();
};

function addPanel(container) {



    return container.node();
};



// Import data
density = FileAttachment('../../datasets/particles/density.csv').csv({ typed: true });
densityManila = density.filter(d => d.country === "Philippines");
densityOthers = density.filter(d => d.country !== "Philippines");
groupAssign = FileAttachment('../../datasets/particles/group_assign.csv').csv({ typed: true });

// Parameters
height = width * .49;                // Height of particle chart
rMean = (width * .49 / 40) / 2;      // Mean radius
rSD = rMean * .75;                   // SD radius
velocity = rMean * .8;               // Particle velocity

colors = ["#4889ab", "#7fc6a4", "#FCB13B", "#B13D70", "#f697bb"];

color = d3.scaleOrdinal()
    .domain([1, 2, 3, 4, 5])
    .range(colors);

bbox = ([[x1, y1], [x2, y2]]) => [
    { from: { x: x1, y: y1 }, to: { x: x1, y: y2 } },
    { from: { x: x1, y: y2 }, to: { x: x2, y: y2 } },
    { from: { x: x2, y: y2 }, to: { x: x2, y: y1 } },
    { from: { x: x2, y: y1 }, to: { x: x1, y: y1 } }
];

// Function to generate particles for a given city

function genpoints(city) {

    const density = Math.round(city[0].density / 100);
    
    const groupAssignCity = groupAssign.filter(d => d.city === city[0].city);
    const counts = groupAssignCity.map(row => row.points_ingroup);
    const groups = [1, 2, 3, 4, 5];
    const groupArray = counts.flatMap((count, i) =>
        Array.from({ length: count }, () => groups[i])
    );
    
    const points = Array.from(
        { length: density },
        (_, i) => ({
            x: d3.randomUniform((width * .49 * .15), (width * .49 * .85))(),
            y: d3.randomUniform(height * .15, height * .85)(),
            r: d3.randomNormal(rMean, rSD)(),
            vx: d3.randomUniform(-1, 1)() * velocity,
            vy: d3.randomUniform(-1, 1)() * velocity,
            group: groupArray[i]
        })
    );

    return points;
}

// Function to generate particles chart

function particles(selection, city) {

    // Read data
    const nodes = genpoints(city).map(Object.create);

    // Panel
    const svg = selection.append("svg")
        .attr("width", width * .49)
        .attr("height", height * 1.1)
        .attr("viewBox", [0, 0, width * .49, height * 1.1])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic");

    // Chart box
    svg.append("rect")
        .attr("width", width * .49)
        .attr("height", height)
        .attr("fill", "#f7f7f7")
        .attr("stroke", "#bcbcbc")
        .attr("stroke-width", 1);

    // Bottom label
    const densityStat = d3.format(",.2r")(city[0].density);
    svg.append("text")
        .attr("id", "chart-text")
        .attr("x", width * .49 / 2)
        .attr("y", height * 1.075)
        .attr("text-anchor", "middle")
        .text(`${densityStat} people/km²`);

    // Draw particles
    const node = svg.append("g")
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", d => d.r)
        .attr("fill", (d) => color(d.group));
    
    // Define forces
    const simulation = d3.forceSimulation(nodes)
        .force("bounce", d3.forceBounce()
            .radius(d => d.r + .5))
        .force("surface", d3.forceSurface()
            .surfaces(bbox([[0, 0], [width * .49, height]]))
            .oneWay(true)
            .radius(d => d.r + 1))
        .force('limit', d3.forceLimit()
            .x0(0).x1(width * .49).y0(0).y1(height))
        .alphaDecay(0)
        .velocityDecay(0)
        .on("tick", () => { node.attr("cx", d => d.x).attr("cy", d => d.y) });
}

// Function to generate legend

function legend(selection) {
    
    const legendWidth = 390;
    const legendHeight = 34;
    const rLegend = .5;
    
    const legendBox = selection.append("svg")
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .attr("viewBox", [0, 0, legendWidth, legendHeight])
        .attr("style", "max-width: 90%; height: auto; height: intrinsic;");
    
    legendBox.append("circle")
        .attr("cx", rLegend + "rem")
        .attr("cy", ".5rem")
        .attr("fill", "#4889ab")
        .attr("r", rLegend + "rem");

    legendBox.append("text")
        .attr("x", (rLegend * 3) + "rem")
        .attr("y", ".85rem")
        .attr("text-anchor", "left")
        .text("Native ancestors");

    legendBox.append("g")
        .selectAll("circle")
        .data([1, 2, 3, 4])
        .join("circle")
        .attr("cx", d => (9 + rLegend + (d - 1) * rLegend * 3) + "rem")
        .attr("cy", ".5rem")
        .attr("fill", d => color(d + 1))
        .attr("r", rLegend + "rem");

    legendBox.append("text")
        .attr("x", (9 + rLegend * 3 * 4) + "rem")
        .attr("y", ".85rem")
        .attr("text-anchor", "left")
        .text("Migrant ancestors");
}