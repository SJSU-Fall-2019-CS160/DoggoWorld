import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Header_footer/index";
import Landing from "./components/Landing";
import RegisterLogin from "./components/Register_login/index";
import Register from "./components/Register_login/Register";
import UserDashboard from "./components/Dashboard/UserDashboard";
import Event from "./components/Dashboard/Event/Event";
import Chatroom from "./components/Chatroom/Chatroom";

function App() {
  return (
    <Router>
      <Landing>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/register_login" component={RegisterLogin} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={UserDashboard} />
          <Route exact path="/chattest" component={Chatroom} />
        </Switch>
      </Landing>
    </Router>
  );
}

export default App;
