import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Header_footer/index";
import Landing from "./components/Landing";
import RegisterLogin from "./components/Register_login/index";
import Register from "./components/Register_login/Register";

function App() {
  return (
    <Router>
      <Landing>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/register_login" component={RegisterLogin} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Landing>
    </Router>
  );
}

export default App;
