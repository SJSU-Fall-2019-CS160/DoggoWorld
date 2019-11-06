import React,{Component} from "react";
import { Button, Form } from "react-bootstrap";
import Myfunctions from "../userfunctions";
export default class SignUp extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          email:"",
          first_name:"",
          last_name:"",
          password:"",
          //confirmPassword:""
          
        }
    }
    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }
    handleFirstNameChange(e) {
        this.setState({first_name: e.target.value});
    }
    handleLastNameChange(e) {
        this.setState({last_name: e.target.value});
    }
    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }
    // handleConfirmPasswordChange(e) {
    //     this.setState({confirmPassword: e.target.value});
    // }
    handleSignUp() {
        Myfunctions.postSignUp({
            email: this.state.email,
            first_name: this.state.first_name,
            last_name:this.state.last_name,
            password:this.state.password,
            //confirmPassword:""
        })
        
    }
    

    
    // const mockSignup = async function(email, first_name, last_name, password){
    //     const body = {
    //         email,
    //         first_name,
    //         last_name,
    //         password
    //     }
    //     const res = await axios.post('/api/users', body);
    // }

        render()
        {
            return(
                <div>
                       
                   
                <h1>
                    SignUp
                </h1>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="John.Doe@email.com" value={this.state.email} onChange={e => this.handleEmailChange(e)} />
                        <Form.Text className="text-muted">
                        
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="name" placeholder="John" value={this.state.first_name} onChange={e => this.handleFirstNameChange(e)} />
                        <Form.Text className="text-muted">
                        
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formLastName">
                        <Form.Label >Last Name</Form.Label>
                        <Form.Control type="name" placeholder="Doe" value={this.state.last_name} onChange={e => this.handleLastNameChange(e)}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                    <Form.Label >Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={e => this.handlePasswordChange(e)}/>
                </Form.Group>

    
                    {/* <Form.Group controlId="formConfirmPassword">
                        <Form.Label >Password</Form.Label>
                        <Form.Control type="password" placeholder=" Confirm Password" value={this.state.confirmPassword} onChange={e => this.handleConfirmPasswordChange(e)}/>
                    </Form.Group> */}

    
                    <Button variant="primary" type="button" onClick={e => this.handleSignUp()}>
                        SignUp
                    </Button>
                
                              
        
             </div>
            
        
            );
        }
    
}