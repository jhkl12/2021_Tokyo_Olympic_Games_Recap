import Data from "./data";
const d3 = require("d3");
const topojson = require("topojson-client");

// TODO
// create hover popup when hovering over country
// create legend
// import athletes on click


class Map {
  constructor() {
    d3.select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("text-align","left")
    .style("padding",16+"px")
    .style("background-color","lightsalmon")
    .style("border","1px solid black")
    .style("width","auto")
    .style("opacity",0)
    .style("color","black")
    .style("position","absolute")
    .style("z-index",3)
    // creating map
    const width = 1100;
    const height = 700;

    const svg = d3
      .select(".worldmap")
      .attr("width", width)
      .attr("height", height);

    const projection = d3
      .geoMercator()
      .scale(170)
      .translate([width / 2, height / 1.4]);
    const path = d3.geoPath(projection);

    const g = svg.append("g");
    d3.json("data/countries-50m.json").then((data) => {
      const countries = topojson.feature(data, data.objects.countries);

      g.selectAll("path")
        .data(countries.features)
        .enter()
        .append("path")
        .attr("class", "country")
        .attr("id", (d) => d.properties.name)
        .attr("stroke", "gray")
        .attr("fill", "blue")
        .attr("fill-opacity", (d) => {
          const name = d.properties.name;
          return Data.color(name);
        })
        .attr("d", path)
        // displays hover-tooltip when hovering over country
        .on("mouseover", (e) => {
          
          const name = e.target.__data__.properties.name;
          
          // Creating hover tooltip
          const tooltipDiv = document.getElementById("tooltip");
          tooltipDiv.style.top = d3.pointer(e,this)[0]+10 + "px";
          tooltipDiv.style.left = d3.pointer(e,this)[1]+10 + "px";
          tooltipDiv.style.opacity = .92;
            Data.countryStats(name, e);
        })
        .on("mouseout", () => d3.select("#tooltip").style("opacity", 0))
        .on("mousemove", (e) => {
          d3.select("#tooltip")
            .style("left", d3.pointer(e,this)[0]+10 + "px")
            .style("top", d3.pointer(e,this)[1]+10 + "px")
        })
        .on("click", (e) => {
          // shows data for country on left side of site on click
          const name = e.target.__data__.properties.name;
          // write general bar graph based on element id
          document.getElementById("bar_graph_and_data").remove();
          // and input country name to function to update info
          new Data(name);
        });
    });
  }
}

export default Map;
