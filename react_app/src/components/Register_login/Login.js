import React, { Component } from "react";
import { login } from "../Userfunctions";
import { withRouter } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    login(user)
      .then(res => {
        console.log(res);
        this.props.history.push(`/dashboard`);
      })
      .catch(err => {
        console.log("Enter");
        console.error(err.response);
      });
  }

  render() {
    return (
      <div className="signin_wrapper">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChange}
            />
          </div>
          <button type="submit" className="btn btn-lg btn-primary">
            Sign in
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
