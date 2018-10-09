import React, { Component } from "react";
import Gallery from "./Gallery";

class Home extends Component {
  render() {
    let imageData = [
      {
        url:"https://ei.marketwatch.com/Multimedia/2018/04/03/Photos/ZH/MW-GG707_privat_20180403142848_ZH.jpg",
        header:"Quick quotes",
        content: "get your clients the quotes they need, fast."
      },{
        url: "http://footage.framepool.com/shotimg/qf/899579660-indian-india-arms-crossed-japanese-multicultural.jpg",
        header: "Diverse experts",
        content: "world wide experience gets you results."
      }
    ];
    return (
      <div>
        <div className="intro">
          <h1 className="header">XAVIER</h1>
          <h2 className="header2" >
            quick quotes for private jet liability insurance
          </h2>
          <img className="down-arrow" alt="scroll-down" src="images/down-arrow-inside-circle.svg"/>
        </div>
        <div className="about">
          < Gallery imageUrls = {imageData}
          />
        </div>
      </div>
    );
  }
}
 
export default Home;