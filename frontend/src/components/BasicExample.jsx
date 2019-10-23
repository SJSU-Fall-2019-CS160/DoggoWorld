import React,{Component} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
import { statement } from "@babel/template";
import miniProfile from "/components/miniProfile"


// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default class BasicExample extends Component{
    state = {

    }
    render (){
        return(
            <Router>
            <div>
                <ul>
                
                    <Link to="/"><image src = "/components/images/corgi2.jpg" /> hellodog </Link>
                
                
                    <Link to="/miniProfile">miniProfile </Link>
                
                    <Link to="/topics">Topic </Link>
                
                </ul>

                <hr />

                {/*
                A <Switch> looks through all its children <Route>
                elements and renders the first one whose path
                matches the current URL. Use a <Switch> any time
                you have multiple routes, but you want only one
                of them to render at a time
                */}
                <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="/Profile">
                    <miniProfile />
                </Route>
                <Route path="/topics">
                    <Topic />
                </Route>
                </Switch>
            </div>
            </Router>
        );
        }
}

        // You can think of these components as "pages"
        // in your app.

        function Home() {
        return (
            <div>
            <h2>Home</h2>
            </div>
        );
}

// function Profile() {
    
//   return (
//     <div>
//       <h2>profile</h2>
//     </div>
//   );
// }

// function Chat() {
   
//   return (
    
//     <div>
//       <h2>chat</h2>
//     </div>
//   );
    
    
    
// }

function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}
