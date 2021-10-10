import Example from "./scripts/example";
import Data from "./scripts/data";
import Map from "./scripts/map"
const topojson = require("topojson-client")
const d3 = require("d3");

document.addEventListener("DOMContentLoaded", () => {
    const main = document.getElementById("header");
    const map = new Map();
  // new Example(main)
});

// const data = new Data();
// console.log(data.athletes_by_country["Norway"]);
// debugger

// let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
// let quakes = (await fetch(url)).json()
