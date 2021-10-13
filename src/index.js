import Data from "./scripts/data";
import Map from "./scripts/map"
const topojson = require("topojson-client")
const d3 = require("d3");


document.addEventListener("DOMContentLoaded", () => {
    const main = document.getElementById("header");
    const map = new Map();
    const comparison = Data.countryComparison();
    //const data = new Data("China");

  // new Example(main)
});

