import React,{Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
//import { statement } from "@babel/template";
import MiniProfile from './components/MiniProfile'
import Home from './components/Home'
import Chat from './components/Chat'
import Login from './components/Login'
import Main from './components/Main'
import axios from 'axios';

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function App(){
    
   
      return(
        <Router>
      <div>
        
       
        

       {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL.  */}
        <Switch>
          <Route path="/Chat">
            <Chat />
          </Route>
          <Route path="/Main">
            <Main />
          </Route>
          {/* <Route path="/Login">
            <Login />
          </Route> */}
          <Route path="/MiniProfile">
            <MiniProfile />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
      );
    
}


