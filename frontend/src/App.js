import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import NotFoundPage from "./components/NotFound";
import HomepageLayout from "./components/HomepageLayout";
import Post from "./components/Post";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomepageLayout} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/post" component={Post} />
          <Route exact path="*" component={NotFoundPage}>
            {" "}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
