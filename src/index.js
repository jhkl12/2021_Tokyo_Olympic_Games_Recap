import Example from "./scripts/example";
import Data from "./scripts/data";
import Map from "./scripts/map"
const topojson = require("topojson-client")
const d3 = require("d3");


document.addEventListener("DOMContentLoaded", () => {
    const main = document.getElementById("header");
    const map = new Map();
    // const data = new Data();

    d3.json("data/Medals.json").then((data) => {
        
        console.log(data)
        d3.selectAll("path")
        .data(data)
        .enter()
        .append("path")
        .attr("title", function(d){
            console.log(data)
            return d
        })
    })
   
  // new Example(main)
});

