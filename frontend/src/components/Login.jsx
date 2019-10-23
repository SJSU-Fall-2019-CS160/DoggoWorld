import React,{Component} from "react";
import { Button, Form } from "react-bootstrap";
import Myfunctions from "../userfunctions";
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {email:"", password:""};
    }
    
    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }
    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }
    handleLogin() {
        console.log('start login');
        Myfunctions.postLogin({
            email: this.state.email,
            password: this.state.password
        })
        .then(bool => {
            if (bool) {
                console.log("Login Successful");
                console.log(localStorage.getItem('authToken'));
            }
        });
    }
    render(){
        console.log("Login")
        return (
            <div>
                <h1>
                    LoginPage
                </h1>
            
                
                <div class="row">
                    <div class="column"><Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={e => this.handleEmailChange(e)} />
                    <Form.Text className="text-muted">
                    
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label >Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={e => this.handlePasswordChange(e)}/>
                </Form.Group>

                <Button variant="primary" type="button" onClick={e => this.handleLogin()}>
                    Submit
                </Button>
                </Form></div>
                    <div class="column"><Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Form></div>
                </div>
            </div>
            );
        }  
      
      
  }