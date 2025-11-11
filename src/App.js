import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch,Link,NavLink,Redirect,withRouter } from "react-router-dom";
//只运行一次模块不做任何的导入
import './app.css'


//其他组件
//Link NavLink Redirect

function A(props){
  console.log(props);
  return (
    <div>
      组件a
    </div>
  )
}

function B(){
  return (
    <div>
      组件b
    </div>
  )
}

// function ALink({staticContext,...rest}){
//   console.log(rest)
//   return (
//     <a {...rest} onClick={(e)=>{
//       //阻止事件冒泡
//       e.preventDefault();
//       //页面跳转用history.push 进行跳转
//       rest.history.push(rest.to)
//     }}></a>
//   )
// }

// const Link = withRouter(ALink)

function Nav(){
  return (
    <>
    <div className="nav">
      <NavLink activeStyle={{
        background: '#ddd'
      }} to={{
        pathname:'/a',
        hash:'#e=1',
        search:'?a=1&b=2'
      }}>
      连接a
      </NavLink>
      <NavLink  activeStyle={{
        background: '#ddd'
      }} to="/b">
      连接b
      </NavLink>
    </div>
    </>
  )
}

export default function App(){
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path='/a' component={A} />
        <Route path='/b' component={B} />
        <Redirect to='/b' />
      </Switch>
    </Router>
  )
}


