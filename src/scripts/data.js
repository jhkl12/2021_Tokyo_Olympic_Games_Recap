import medalData from "./medals";
const d3 = require("d3");

class Data {
    constructor (country){
        
    }
    static countryStats = (country,e) => {
        d3.json("data/Medals.json").then((data) => {
            const domEle = document.getElementById("hover-info");
            if (data[country]){
                domEle.innerHTML = `${country} => Gold:${data[country].Gold}, Silver:${data[country].Silver}, Bronze:${data[country].Bronze}` 
            } else {
                domEle.innerHTML = `${country} => Gold:0, Silver:0, Bronze:0` 
            }
        })
    }
    static countries = (country) => {
        let countries = [];
        
        d3.json("data/Medals.json", function(data){
            countries.push(data)
            console.log(data)
        })
        
        console.log(countries);
    }
    static color = (country) => {
        // min opacity = most medals, divide by medals 
        let countries = medalData;
        let opacity = 0;
        let maxMedalCount = 113;
        if (countries[country]){
                  return countries[country].Total/maxMedalCount
        } else {
            return 0
        }

    }
    static update = (country,e) => {
        console.log("clicked");
    }
}

export default Data;