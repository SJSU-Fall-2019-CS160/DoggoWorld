import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bck_b_light">
      <div className="container">
        <div className="left">
          <div className="logo">Doggo World</div>
        </div>
        <div className="right">
          <Link to="/">
            <div className="top">Home</div>
          </Link>
          <Link to="/register_login">
            <div className="bottom">Register/login</div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
