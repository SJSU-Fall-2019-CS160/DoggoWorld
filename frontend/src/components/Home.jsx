import React,{Component} from "react";
import { Carousel } from "react-bootstrap";

export default class Home extends Component {
    state(){

    };

    render(){
        console.log("home")
        return (
            <div>  
                <div>
                    <h2>DoggoWorld</h2>
                    <form action = "/Login" type = "submit" value = "button">
                            <input type="submit" value="login" />
                    </form><p></p>
                        <Carousel>
                
                
                    <Carousel.Item>
                        <img src = "https://picsum.photos/202"
                        className="h-10 w-10"
                        //src="holder.js/800x400?text=First slide&bg=373940"
                        alt="First slide"
                        />
                        <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src = "https://picsum.photos/201"
                        className="h-10 w-50"
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
                        src = "https://picsum.photos/200"
                        className="d-block w-100"
                        //src="holder.js/800x400?text=Third slide&bg=20232a"
                        alt="Third slide"
                        />

                        <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        
        );
    }
  }