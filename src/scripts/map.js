import Data from "./data";
const d3 = require("d3");
const topojson = require("topojson-client");


// TODO
// add color fill to map with medal data
// create hover popup when hovering over country

class Map {
  constructor() {
    const width = 1000;
    const height = 700;

    const svg = d3.select("svg").attr("width", width).attr("height", height);
    //creates latitude and longitude lines
    const projection = d3
      .geoMercator()
      .scale(170)
      .translate([width / 2, height / 1.4]);
    const path = d3.geoPath(projection);

    const g = svg.append("g");
    d3.json("data/countries-50m (1).json").then((data) => {
      const countries = topojson.feature(data, data.objects.countries);

      g.selectAll("path")
        .data(countries.features)
        .enter()
        .append("path")
        .attr("class", "country")
        .attr("id", (d) => {
          return d.properties.name;
        })
        .attr("stroke","gray")
        .attr("fill", "blue")
        .attr("fill-opacity", (d) => {
            const name = d.properties.name;
            return Data.color(name);
        })
        .attr("d", path)
        .on("mouseover", (e) => {
          const name = e.target.__data__.properties.name;
          Data.countryStats(name, e);
          // const domEle = document.getElementById("hover-info");
          // domEle.innerHTML = name;
          // console.log(name);
        })
        .on("click", (e) => {
          // shows data for country on left side of site on click
          const name = e.target.__data__.properties.name;
          // write general bar graph based on element id
          // and input country name to function to update info
          Data.update();
        })
        Data.color('Russia')
    });
  }
}

export default Map;
