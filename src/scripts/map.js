import Data from "./data";

const d3 = require("d3");
const topojson = require("topojson-client")

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
      let i = 0;
      d3.json("data/countries-50m (1).json").then((data) => {
          const countries = topojson.feature(data, data.objects.countries);
          
          g.selectAll("path")
          .data(countries.features)
          .enter()
          .append("path")
          .attr("class", "country")
          .attr("id", d => {
              return d.properties.name;
            })
            .attr("d", path)
            .on("mouseover", e => {
                const name = e.target.__data__.properties.name
                Data.countryStats(name,e)
                // const domEle = document.getElementById("hover-info");
                // domEle.innerHTML = name; 
                // console.log(name);
            })
            // .attr("fill", d => color(data.get(d.properties.name)))

        });
    }
    
 
}

export default Map;
