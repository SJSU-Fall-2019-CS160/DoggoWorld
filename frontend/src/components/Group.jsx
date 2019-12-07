import React,{Component} from "react";
import { Button, Form } from "react-bootstrap";
import { Redirect } from  'react-router-dom'
import Myfunctions from "../userfunctions";
export default class Group extends Component {
   
   
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        }
    }
    //need help with create group
    handleCreateGroup(){
        Myfunctions.postCreateGroup({
            name: this.state.name,
            //headers: {'x-auth-token': 'token'}
        })

    }
    handleGroupNameChange(e) {
        this.setState({name: e.target.value});
    }
   

    render() { 
        return (
            <div>
            <Form.Group controlId="formBasicEmail">
                        <Form.Label>Group Name</Form.Label>
                        <Form.Control type="name" placeholder="Dog Group" value={this.state.name} onChange={e => this.handleGroupNameChange(e)} />
                        <Form.Text className="text-muted">
                        
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={e => this.handleCreateGroup()}>
                        Create
                    </Button>
            <h1 >{this.state.name}</h1>
            </div>
        );
 
    }
   
  }