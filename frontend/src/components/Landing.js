import React, { Component } from "react";
import { Grid, Image } from "semantic-ui-react";

class Landing extends Component {
  render() {
    return (
      <Grid centered>
        <Grid.Row>
          <Grid.Column>
            <img src={`${window.location.origin}/images/main.jpg`}></img>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row></Grid.Row>
      </Grid>
    );
  }
}

export default Landing;
