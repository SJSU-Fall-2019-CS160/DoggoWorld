import React, { Component } from "react";
import { getMyGroups } from "../Userfunctions";
class Groups extends Component {
  constructor() {
    super();
    this.state = {
      groups: []
    };
  }

  componentDidMount() {
    getMyGroups()
      .then(data => {
        this.setState({
          groups: data.groups
        });
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderList() {
    const { groups } = this.state;
    return groups.map(group => {
      return (
        <tr>
          <td>{group.name}</td>
          <td></td>
          <td></td>
        </tr>
      );
    });
  }

  render() {
    return (
      <table>
        <tr>
          <th>Groups</th>
          <th>Joined</th>
          <th>isAdmin</th>
        </tr>
        {this.renderList()}
      </table>
    );
  }
}

export default Groups;
