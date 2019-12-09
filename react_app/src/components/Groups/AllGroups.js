import React, { Component } from "react";
import { getAllGroups, createGroup, joinGroup } from "../Userfunctions";

class AllGroups extends Component {
  constructor() {
    super();
    this.state = {
      groups: [],
      newgroup: ""
    };
  }

  handleCreate = e => {
    const group = {
      name: this.state.newgroup
    };

    createGroup(group).then(res => {
      this.setState({ groups: [res.data, ...this.state.groups] });
    });
  };
  handleJoin = id => {
    joinGroup(id).then(res => {
      console.log("joined");
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    getAllGroups()
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
          <td>
            <button className="btn btn-primary" onClick={()=>this.handleJoin(group.id)}
            >Join</button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <div className="col-sm-5 mx-auto">
          <h1 className="text-center">Groups</h1>
        </div>
        <table className="table col-md-6 mx-auto my-5">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Join</th>
            </tr>
            <tr>
              <td>
                <input
                  name="newgroup"
                  type="text"
                  value={this.state.newgroup}
                  onChange={this.onChange}
                ></input>
              </td>
              <td>
                <button className="btn btn-danger" onClick={this.handleCreate}>
                  Create Group
                </button>
              </td>
            </tr>
            {this.renderList()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AllGroups;
