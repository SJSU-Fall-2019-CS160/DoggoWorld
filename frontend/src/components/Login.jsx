import React,{Component} from "react";
import { Button, Form } from "react-bootstrap";
import Myfunctions from "../userfunctions";
import { Redirect } from  'react-router-dom'
export default class Login extends Component {
    constructor(props) {
        super(props);
        const redir = sessionStorage.authToken ? true : false;
        this.state = {email:"", password:"", redirect:redir};
        
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
                console.log(sessionStorage.getItem('authToken'));
                console.log(sessionStorage.getItem('myData'));
                console.log("hello")
                console.log(sessionStorage.getItem('myData'))
                var getObject = JSON.parse(sessionStorage.getItem('myData')).first_name;
                console.log(getObject)
                this.setState({
                    redirect:true
                })
               
            }
        });
    }
    renderRedirect = () => {
        if(this.state.redirect) return <Redirect to='/Main' />;

    }

    render(){
        console.log("Login")
        return (
            <div>
            {this.renderRedirect()}
            <h1>{"DoggoWorld"}<hr/></h1>            
                <div class="row">
                    <div class="column"><Form>
                    <h1>
                    Login
                </h1>
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
                    Login
                </Button>
                </Form></div>
                    <div class="column"><Form>
                    <h1>
                    Signups
                </h1>
                <Form.Group controlId="newFormBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="createPassword">
                    <Form.Label>Create Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="reEnteredPassword">
                    <Form.Label>Re-Enter Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
                </Form></div>
                </div>
            </div>
            );
        }  
      
      
  }