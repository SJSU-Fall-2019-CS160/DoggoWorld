import React,{Component} from "react";
export default class MiniProfile extends Component {
    // state = {
        
    //     name: "alex",
    //     bio: "something about me",
    //     imageUrl: "https://picsum.photos/200"
    //  };
   
    constructor(props) {
        super(props);
        this.state = {name:JSON.parse(sessionStorage.getItem('myData')).first_name + " " +JSON.parse(sessionStorage.getItem('myData')).last_name, bio:""};
    }

    render() { 
        return (
            <div>
        
                <h1><img src = {this.state.imageUrl} alt = ""/></h1>
                <span style = {this.stylesName}>{this.state.name}</span>
                <form style = {this.stylesEdit} action = "/Chat" type = "submit" value = "button">
                    <input type="submit" value="edit" />
                </form>
                <span src = {this.state.bio}/>
               
              
                {/* <img src = {this.state.imageUrl} alt = ""/> */}
        
               {/* {this.state.tags.length ===0 && "please create new tag"}
                {this.renderTags()} */}
                {/* <button onClick={this.handleIncrement} className="bt bt-secondary btn-sm"> Increment></button> */}
            </div>
        );
 
    }
   
  }