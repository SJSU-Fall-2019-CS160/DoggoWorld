import React from "react";
import { Link } from "react-router-dom";

const loginlink = () => {
  if (sessionStorage.getItem("authToken")) {
    return (
      <div className="d-flex justify-content-end">
        <Link to="/dashboard">
          <div className="bottom">My account</div>
        </Link>
        <Link to="/register_login">
          <div className="bottom">logout</div>
        </Link>
      </div>
    );
  } else {
    return (
      <Link to="/register_login">
        <div className="bottom">Register/login</div>
      </Link>
    );
  }
};

const Header = () => {
  return (
    <React.Fragment>
      <header className="bck_b_light">
        <div className="container">
          <div className="left">
            <div className="logo">DoggoWorld</div>
          </div>
          <div className="right">
            <Link to="/">
              <div className="top">Home</div>
            </Link>
            {loginlink()}
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
