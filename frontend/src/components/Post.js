import React from "react";
import { Button, Comment, Form, Header } from "semantic-ui-react";

const CommentExampleComment = () => (
  <Comment.Group>
    <Header as="h3" dividing>
      Comments
    </Header>

    <Comment>
      <Comment.Avatar src="/images/avatar/small/matt.jpg" />
      <Comment.Content>
        <Comment.Author as="a">Alex</Comment.Author>
        <Comment.Metadata>
          <div>Today at 5:42PM</div>
        </Comment.Metadata>
        <Comment.Text>Hello!</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

    <Comment>
      <Comment.Avatar src="/images/avatar/small/elliot.jpg" />
      <Comment.Content>
        <Comment.Author as="a">Han</Comment.Author>
        <Comment.Metadata>
          <div>Yesterday at 12:30AM</div>
        </Comment.Metadata>
        <Comment.Text>
          <p>What up!</p>
        </Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

    <Form reply>
      <Form.TextArea />
      <Button content="Add Reply" labelPosition="left" icon="edit" primary />
    </Form>
  </Comment.Group>
);

export default CommentExampleComment;
