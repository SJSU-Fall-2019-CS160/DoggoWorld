import React, { Component } from "react";
import UserLayout from "./UserLayout";
import { getProfile } from "../Userfunctions";
import Groups from "../Groups/Groups";

class UserDashboard extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: ""
    };
  }

  componentDidMount() {
    getProfile()
      .then(data =>
        this.setState({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email
        })
      )
      .catch(err => {
        console.log(err.response.data);
      });
  }

  render() {
    return (
      <UserLayout>
        <div className="user_nfo_panel">
          <h1>User information</h1>
          <div>
            <span>User Name: </span>
            <h1>{this.state.first_name}</h1>

            <span>Primary Email: </span>
            <h1>{this.state.email}</h1>
          </div>
        </div>
        <div className="user_nfo_panel">
          <h1>My Group</h1>
          <div className="user_product_block_wrapper">
            <Groups />
          </div>
        </div>
      </UserLayout>
    );
  }
}

export default UserDashboard;
