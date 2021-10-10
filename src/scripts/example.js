const d3 = require("d3");
class Example {
  constructor(ele){
      this.ele = ele
      this.ele.innerHTML = "<h1>It's ALIVE!!!</h1>"
      this.handleClick = this.handleClick.bind(this)
      this.ele.addEventListener("click", this.handleClick)
      d3.select('h1').style('color','darkblue');
      


  }
  
  handleClick(){
      this.ele.children[0].innerText = "Ouch!"
  }
}
export default Example;