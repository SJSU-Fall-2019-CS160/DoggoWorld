import React,{Component} from "react";
import MiniProfile from "./MiniProfile";
import Chat from "./Chat";


export default class Main extends Component {

    render() { 
        
        return (
           
            
             <div>
                 <h2>Profile<hr/></h2>
            <div class='row'>
                
                
                <div class = 'profileCol'>
                    <th><MiniProfile></MiniProfile> </th>
                    </div>
                <div class= 'chatCol'>
                    <Chat></Chat>
                    </div>
                
                <div class = 'eventCol'>
                    <th><MiniProfile></MiniProfile> </th> 
                    </div>
               
               
               
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