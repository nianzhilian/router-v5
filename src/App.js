import React, { useDeferredValue } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//只运行一次该模块不做任何的导入
import './app.css'
import { Login } from "./page/Login";
import Admin from "./page/Admin";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Admin} />
        </Switch>
      </Router>
      </>
    );
  }
}
export default App;
