import React,{Component} from "react";
import { Carousel } from "react-bootstrap";
import axios from 'axios';
import Login from "./Login";
import SignUp from "./SignUp";
import ToolBar from "./ToolBar";
export default class Home extends Component {
    

    // mockSignup = async function(email, first_name, last_name, password){
    //     const body = {
    //         email,
    //         first_name,
    //         last_name,
    //         password
    //     }
    //     const res = await axios.post('/api/users', body);
    //     let id = 1;
    //     axios.get(`/api/groups/${id}/members`);

    //     axios.get('/api/groups/my', {
    //         headers:{'x-auth-token': sessionStorage.getItem('authToken')},
    //         data:{}
    //     })

    // }

    render(){
        console.log("home")
        return (
            <div>  
                <div>
                <ToolBar></ToolBar>
                    
                    <div class="row">
                        <div class="column">
                            <Login></Login>
                            </div>
                        <div class = "column">
                            <SignUp></SignUp>
                            </div>
                    </div>
                    
                    
                    
                    
                    {/* <Carousel>
                
                
                    <Carousel.Item>
                        <img src = "https://picsum.photos/300"
                       // className="h-10 w-10"
                        //src="holder.js/800x400?text=First slide&bg=373940"
                        alt="First slide"
                        />
                        <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> 
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src = "https://picsum.photos/300"
                       // className="h-10 w-50"
                        //src="holder.js/800x400?text=Second slide&bg=282c34"
                        alt="Third slide"
                        />

                        <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        src = "https://picsum.photos/300"
                       // className="d-block w-100"
                        //src="holder.js/800x400?text=Third slide&bg=20232a"
                        alt="Third slide"
                        />

                        <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    </Carousel> */}
                </div>
            </div>
        
        );
    }
  }