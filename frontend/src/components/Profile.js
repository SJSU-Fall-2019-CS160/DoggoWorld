import React, { Component } from "react";
import { getProfile } from "./UserFunctions";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    getProfile()
      .then(data =>
        this.setState({
          email: data.email,
          password: data.hashed_password
        })
      )
      .catch(err => {
        console.log(err.response.data);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>Username</td>
                <td>{this.state.email}</td>
              </tr>
              <tr>
                <td>Hashed password (demo purpose)</td>
                <td>{this.state.password}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Profile;
