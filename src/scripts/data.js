import medalData from "./medals";
const d3 = require("d3");
const topojson = require("topojson-client");

class Data {
  constructor(country) {
    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 90, left: 90 },
      width = 460 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;

    d3.select(".country_name").text(country);
    // append the svg object to the body of the page

    const svg = d3
      .select("#data_section")
      .append("div")
      .attr("id", "bar_graph_and_data")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("id", "bar_graph")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.json("data/Medals.json").then((data) => {
      if (data[country]) {
        Data.topTenButton();
        data = [
          { Medal: "Gold", Value: data[country].Gold },
          { Medal: "Silver", Value: data[country].Silver },
          { Medal: "Bronze", Value: data[country].Bronze },
        ];
        // X axis
        const x = d3
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
        svg
          .append("text")
          .attr("x", width / 2)
          .attr("y", height + margin.top + 35)
          .style("text-anchor", "middle")
          .text("Country");
        // Add Y axis
        let y = d3.scaleLinear().domain([0, 60]).range([height, 0]);
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

        svg
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left + 30)
          .attr("x", 0 - height / 2)
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .text("Medal Count");
        // Animation
        svg
          .selectAll("rect")
          .transition()
          .duration(800)
          .attr("y", (d) => y(d.Value))
          .attr("height", (d) => height - y(d.Value))
          .delay((d, i) => {
            return i * 100;
          });
      } else {
        Data.topTenButton();
        d3.select("#bar_graph").remove();
        d3.select("#bar_graph_and_data")
          .append("iframe")
          .attr("src", "https://giphy.com/embed/3o6Mbrf57NWqQULEXe")
          .attr("width", width)
          .attr("height", height)
          .attr("frameBorder", 0)
          .attr("class", "giphy-embed")
          .attr("allowFullScreen");
      }
    });

    d3.json("data/Athletes_by_country.json").then((data) => {
      const createTable = (data, columns) => {
        d3.select("#table").remove();
        const table = d3
          .select("#data_section")
          .append("table")
          .attr("id", "table")
          .style("margin-left","40px");
        const thead = table.append("thead");
        const tbody = table.append("tbody");

        thead
          .append("tr")
          .selectAll("th")
          .data(columns)
          .enter()
          .append("th")
          .text((column) => column);

        const rows = tbody.selectAll("tr")
        .data(data).enter().append("tr");

        rows.selectAll("td")
          .data(function (row) {
            return columns.map(function (column) {
              return { column: column, value: row[column] };
            });
          })
          .enter()
          .append("td")
          .text(function (d) {
            return d.value;
          });

        return table;
      };
      createTable(data[country], ["Name", "Discipline"]);
    });
  }

  static countryComparison = () => {
    // if no country is passed in, create chart on top countries
    d3.select("#table").remove();
    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 40, left: 50 };
    const width = 700 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;
    d3.select("#data_section")
      .append("h2")
      .attr("class", "country_name")
      .text("Top 10");
    // append the svg object to the body of the page
    const svg = d3
      .select("#data_section")
      .append("div")
      .attr("id", "bar_graph_and_data")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("id", "bar_graph")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.top + 20)
      .style("text-anchor", "middle")
      .text("Country");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Medal Count");
    // Parsing the Data
    d3.csv("data/Top Medal Earners.csv").then((data) => {
      const medals = data.columns.slice(1);
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
        .domain(medals)
        .range(["#FEE101", "#D7D7D7", "#CC6633"]); //update with more specific colors

      // Stack per subgroup
      const stackedData = d3.stack().keys(medals)(data);

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
        .attr("y", (d) => y(-10))
        .attr("height", (d) => y(0))
        .attr("width", x.bandwidth());

      // Animation
      svg
        .selectAll("rect")
        .transition()
        .duration(600)
        .attr("y", (d) => y(d[1]))
        .attr("height", (d) => y(d[0]) - y(d[1]))
        .delay((d, i) => {
          return i * 100;
        });
    });
  };
  static topTenButton = () => {
    d3.select(".country_name")
      .append("button")
      .text("Compare Countries")
      .style("display", "block")
      .style("margin", "auto")
      .on("click", (e) => {
        document.getElementById("bar_graph_and_data").remove();
        Data.countryComparison();
      });
  };
  //country stats for hover-tooltip
  static countryStats = (country, e) => {
    d3.select("#tooltip_data_container").remove();
    d3.json("data/Medals.json").then((data) => {
      if (data[country]) {
        const rank = data[country].Rank;
        const gold = data[country].Gold;
        const silver = data[country].Silver;
        const bronze = data[country].Bronze;
        const total = gold + silver + bronze;
        let arrTool = [
          `${country}`,
          `Rank: ${rank}`,
          `Gold: ${gold}`,
          `Silver: ${silver}`,
          `Bronze: ${bronze}`,
        ];
        d3.select("#tooltip")
          .append("div")
          .attr("id", "tooltip_data_container");
        for (let i = 0; i < arrTool.length; i++) {
          d3.select("#tooltip_data_container")
            .append("div")
            .style("display", "block")
            .text(arrTool[i]);
        }
      } else {
        let arrTool = [
          `${country}`,
          `Rank: N/A`,
          `Gold: 0`,
          `Silver: 0`,
          `Bronze: 0`,
        ];
        d3.select("#tooltip")
          .append("div")
          .attr("id", "tooltip_data_container");
        for (let i = 0; i < arrTool.length; i++) {
          d3.select("#tooltip_data_container")
            .append("div")
            .style("display", "block")
            .text(arrTool[i]);
        }
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
