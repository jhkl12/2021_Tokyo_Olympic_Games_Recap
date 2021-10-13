import medalData from "./medals";
const d3 = require("d3");
const topojson = require("topojson-client");

class Data {
  constructor(country) {
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 90, left: 40 },
      width = 460 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;

    let dat = medalData;
    d3.select("#data_section")
      .append("h2")
      .attr("class","country_name")
      .text(country)
    // append the svg object to the body of the page
    var svg = d3
      .select("#data_section")
      .append("div")
      .attr("id","bar_graph_and_data")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("id", "bar_graph")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.json("data/Medals.json").then((data) => {
      data = [
        { Medal: "Gold", Value: data[country].Gold },
        { Medal: "Silver", Value: data[country].Silver },
        { Medal: "Bronze", Value: data[country].Bronze },
      ];

      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(data.map((d) => d.Medal))
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 60]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      const color = (medal) => {
        if (medal === "Gold") return "#FEE101";
        if (medal === "Silver") return "#D7D7D7";
        if (medal === "Bronze") return "#CC6633";
      };
      svg
        .selectAll("bars")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.Medal))
        .attr("width", x.bandwidth())
        .attr("fill", (d) => color(d.Medal))
        // no bar at the beginning thus:
        .attr("height", (d) => height - y(0)) // always equal to 0
        .attr("y", (d) => y(0))
        .append("title")
        .text((d) => `${d.Medal}: ${d.Value}`);

      // Animation
      svg
        .selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", (d) => y(d.Value))
        .attr("height", (d) => height - y(d.Value))
        .delay((d, i) => {
          console.log(i);
          return i * 100;
        });
        d3.select("#bar_graph_and_data")
        .append("button")
        .text("Compare Countries")
        .on("click", (e)=> {
            document.getElementById("bar_graph_and_data").remove();
            Data.countryComparison();
        })
    });
  }

  static countryComparison = () => {
    // if no country is passed in, create chart on top countries
    

    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 20, left: 50 };
    const width = 700 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select("#data_section")
      .append("div")
      .attr("id","bar_graph_and_data")
      .append("h2")
      .attr("class","country_name")
      .text("Top 10")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("id", "bar_graph")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Parsing the Data
    d3.csv("data/Top Medal Earners.csv").then((data) => {
      // List of subgroups = header of the csv files = soil condition here
      const subgroups = data.columns.slice(1);
      // List of groups = species here = value of the first column called group -> I show them on the X axis
      const groups = data.map((d) => d.NOC);

      // X axis
      const x = d3.scaleBand().domain(groups).range([0, width]).padding([0.2]);
      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

      // Y axis
      const y = d3.scaleLinear().domain([0, 120]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      const color = d3
        .scaleOrdinal()
        .domain(subgroups)
        .range(["#FEE101", "#D7D7D7", "#CC6633"]); //update with more specific colors

      // Stack per subgroup
      const stackedData = d3.stack().keys(subgroups)(data);

      // Bars
      svg
        .append("g")
        .selectAll("g")
        // Enter in the stack data = loop key per key = group per group
        .data(stackedData)
        .join("g")
        .attr("fill", (d) => color(d.key))
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data((d) => d)
        .join("rect")
        .attr("x", (d) => x(d.data.NOC))
        .attr("y", (d) => y(0))
        .attr("height", (d) => y(0))
        .attr("width", x.bandwidth());

      svg
        .selectAll("rect")
        .transition()
        .duration(600)
        .attr("y", (d) => y(d[1]))
        .attr("height", (d) => y(d[0]) - y(d[1]))
        .delay((d, i) => {
          console.log(i);
          return i * 100;
        });
    });
  };
  //country stats for hover-tooltip
  static countryStats = (country, e) => {
    d3.json("data/Medals.json").then((data) => {
      const domEle = document.getElementById("tooltip");
      if (data[country]) {
        const rank = data[country].Rank;
        const gold = data[country].Gold;
        const silver = data[country].Silver;
        const bronze = data[country].Bronze;
        const total = gold + silver + bronze;
        let tooltipText = `${country} \n => \n Rank: ${rank}\n Gold: ${gold}\n Silver: ${silver}, Bronze: ${bronze}, Total: ${total}`;
        d3.select("#tooltip")
          .transition()
          .duration(200)
          .style("opacity", 1)
          .text(tooltipText);
      } else {
        let tooltipText = `${country} \n => \n Rank: N/A \n Gold: 0 \n Silver: 0, Bronze: 0, Total: 0`;
        d3.select("#tooltip")
          .transition()
          .duration(200)
          .text(tooltipText);
      }
    });
  };

  // #color sets opacity for each country's medal count
  static color = (country) => {
    let countries = medalData;
    let maxMedalCount = 113;
    if (countries[country]) {
      return countries[country].Total / maxMedalCount;
    } else {
      return 0;
    }
  };

}

export default Data;
