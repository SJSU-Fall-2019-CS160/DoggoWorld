import React,{Component} from "react";
import { Button, Form } from "react-bootstrap";
import { Redirect } from  'react-router-dom'
export default class MiniProfile extends Component {
    // state = {
        
    //     name: "alex",
    //     bio: "something about me",
    //     imageUrl: "https://picsum.photos/200"
    //  };
   
    constructor(props) {
        super(props);
        this.state = {name:JSON.parse(sessionStorage.getItem('myData')).first_name + " " +JSON.parse(sessionStorage.getItem('myData')).last_name, bio:"I have 2 dogs"+" I love them"};
    }
    handleEdit = () => {
        return <Redirect to='/Chat' />;
    }

    render() { 
        return (
            <div>
        
               <h1> <img src = {"/components/images/corgi2.jpg"} alt = ""/></h1>
                <h2><span >{this.state.name}</span></h2>
                <button variant="primary" type="button" onClick={e => this.handleEdit()}>
                    Edit
                </button>
                <h3>{this.state.bio}</h3>
               
              
                {/* <img src = {this.state.imageUrl} alt = ""/> */}
        
               {/* {this.state.tags.length ===0 && "please create new tag"}
                {this.renderTags()} */}
                {/* <button onClick={this.handleIncrement} className="bt bt-secondary btn-sm"> Increment></button> */}
            </div>
        );
 
    }
   
  }