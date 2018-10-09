import React, { Component } from "react";
 
class Contact extends Component {
  render() {
    return (
      <div className="contacts">
        <h2 className="header2">Contact us</h2>
        <div  className="contact-text">
          <p>
            60 Nichols Street<br></br>
            Oxnard, CA 93035<br></br>
          </p>
          <br></br>
          <p>
            phone: (818) 918-8891<br></br>
            fax: (919) 819-9918<br></br>
            email: infoe@xavier.com
          </p>
        </div>
      </div>
    );
  }
}
 
export default Contact;