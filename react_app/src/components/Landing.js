import React, { Component } from "react";
import Header from "./Header_footer/Header";
import Footer from "./Header_footer/Footer";

class Landing extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="page_container">{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

export default Landing;
