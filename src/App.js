import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import qs from "query-string";
import {Login} from './page/Login'
import Admin from './page/Admin'
//只运行一次该模块不做任何的导入
import './app.css'

function Notfound(){
  return (
    <div>
      404页面
    </div>
  )
}

export default class App extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <Router>
        <Switch>
          <Route path='/login' exact component={Login}></Route>
          <Route path='/' component={Admin}></Route>
          {/* <Route component={Notfound} /> */}
        </Switch>
      </Router>
    )
  }
}


