import Data from "./scripts/data";
import Map from "./scripts/map"
const topojson = require("topojson-client")
const d3 = require("d3");


document.addEventListener("DOMContentLoaded", () => {
    const map = new Map();
    const comparison = Data.countryComparison();
});

