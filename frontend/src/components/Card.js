import React from "react";
import { Popup, Card, Image, Rating } from "semantic-ui-react";

const PopupExampleTrigger = () => (
  <Popup
    trigger={
      <Card>
        <Image src="/images/" />
        <Card.Content>
          <Card.Header></Card.Header>
          <Card.Description></Card.Description>
        </Card.Content>
      </Card>
    }
  >
    <Popup.Header>User Rating</Popup.Header>
    <Popup.Content>
      <Rating icon="star" defaultRating={3} maxRating={4} />
    </Popup.Content>
  </Popup>
);

export default PopupExampleTrigger;
