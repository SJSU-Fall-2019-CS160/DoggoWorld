import React, { Component } from "react";
import { Grid, Image } from "semantic-ui-react";

class Landing extends Component {
  render() {
    return (
      <Grid centered>
        <Grid.Row>
          <Grid.Column width="10">
            <img src={`${window.location.origin}/images/main.jpg`}></img>
          </Grid.Column>
          <Grid.Column>
            <Image src="/images/main2.jpg"></Image>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row></Grid.Row>
      </Grid>
    );
  }
}

export default Landing;
