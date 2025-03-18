
export function addFormsAnnotation(container, params) {

    const svg = container.append("svg")
        .attr("width", params.width * 2)
        .attr("height", params.formLabelsHeight)
        .attr("viewBox", [0, 0, params.width, params.formLabelsHeight]);
    
    svg.call(addArrow);
    
    // Left label /////////////////////////////////////////////////////////////

    const formLabelLeft = svg.append("g")
        .attr("transform", "translate(0, 30)");
    
    const textLeft = formLabelLeft.append("g")
        .append("text")
            .attr("class", "annotation-text")
            .attr("x", 0).attr("y", 0);
    
    textLeft.append("tspan")
        .text("Pick a")
        .attr("x", 0).attr("y", 0);
    textLeft.append("tspan")
        .text("Metro Manila")
        .attr("x", 0).attr("y", 0).attr("dy", 18);
    textLeft.append("tspan")
        .text("city...")
        .attr("x", 0).attr("y", 0).attr("dy", 18 * 2);
    
    formLabelLeft.append("g")
        .attr("transform", "translate(-60, 20)")
        .attr("class", "annotation-arrow")
        .attr("marker-end", "url(#annotation-arrow)")
        .call(g => g.append("path")
        .attr("d", () => {
            const path = d3.path();
            path.moveTo(0, 0);
            path.quadraticCurveTo(-20, 5, -20, 35);
            return path;
        }))

    // Right label /////////////////////////////////////////////////////////////
    
    const formLabelRight = svg.append("g")
        .attr("transform", "translate(450, 35)");
    
    const textRight = formLabelRight.append("g")
        .append("text")
            .attr("class", "annotation-text")
            .attr("x", 0).attr("y", 0);
    
    textRight.append("tspan")
        .text("...and")
        .attr("x", 0).attr("y", 0);
    textRight.append("tspan")
        .text("compare with")
        .attr("x", 0).attr("y", 0).attr("dy", 18);
    textRight.append("tspan")
        .text("a global city")
        .attr("x", 0).attr("y", 0).attr("dy", 18 * 2);
    
    formLabelRight.append("g")
        .attr("transform", "translate(65,10)")
        .attr("class", "annotation-arrow")
        .attr("marker-end", "url(#annotation-arrow)")
        .call(g => g.append("path")
        .attr("d", () => {
            const path = d3.path();
            path.moveTo(0, 0);
            path.quadraticCurveTo(25, 0, 20, 35);
            return path;
        }))

    return container.node();
}


export function addLegendAnnotation(container, params) {

    const svg = container.append("svg")
        .attr("width", params.width * 2)
        .attr("height", params.formLabelsHeight)
        .attr("viewBox", [0, 0, params.width, params.formLabelsHeight]);
    
    svg.call(addArrow);

    const label = svg.append("g")
        .attr("transform", "translate(150, 50)");
    
    const text = label.append("g")
        .append("text")
            .attr("class", "annotation-text")
            .attr("x", 0).attr("y", 0);
    
    text.append("tspan")
        .text('Your ancestors are "native" if')
        .attr("x", 0).attr("y", 0);
    text.append("tspan")
        .text("they had been living in your")
        .attr("x", 0).attr("y", 0).attr("dy", 18);
    text.append("tspan")
        .text("country since the year 1500")
        .attr("x", 0).attr("y", 0).attr("dy", 18 * 2);
    
    label.append("g")
        .attr("transform", "translate(-115, 0)")
        .attr("class", "annotation-arrow")
        .attr("marker-end", "url(#annotation-arrow)")
        .call(g => g.append("path")
        .attr("d", () => {
            const path = d3.path();
            path.moveTo(5, 10);
            path.quadraticCurveTo(-40, 10, -10, -35);
            return path;
        }))

    return container.node();
}

function addArrow(container) {

    container.append("defs")
        .append("marker")
            .attr("id", "annotation-arrow")
            .attr("viewBox", "0 0 10 10")
            .attr("refX", 8).attr("refY", 5)
            .attr("markerWidth", 5)
            .attr("markerHeight", 5)
            .attr("orient", "auto")
        .append("path")
            .attr("d", "M0,1 L9,5 L0,9")

    return container.node();
};