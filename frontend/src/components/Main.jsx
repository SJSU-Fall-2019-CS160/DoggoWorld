import React,{Component} from "react";
import MiniProfile from "./MiniProfile";
import Chat from "./Chat";

export default class Main extends Component {

    render() { 
        return (
            <div>
            {/* <div class='column'>
                <MiniProfile></MiniProfile>
                
            </div> */}
            <div>
                <Chat></Chat>
            </div>
            {/* <div>
                <MiniProfile></MiniProfile>
            </div>
            <div>
                <MiniProfile></MiniProfile>
            </div> */}




            </div>
            

        );
 
    }
    
}