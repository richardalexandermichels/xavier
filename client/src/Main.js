import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import AmazingQuote from "./AmazingQuote";
import Contact from "./Contact";
import Background from "./Background";

class Main extends Component {
  //React router comes in handing providing intuitive navigation between full page react components without
  // having to serve seperate html pages.
  render() {
    return (
        <div>
        <HashRouter>
          <div>
          <span className="xyz">xyz</span>
          <ul className="my-places">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/amazingquote">Amazing Quote</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/amazingquote" component={AmazingQuote}/>
            <Route path="/contact" component={Contact}/>
          </div>
         </div>
        </HashRouter>
        <Background/>
        </div>
    );
  }
}
 
export default Main;